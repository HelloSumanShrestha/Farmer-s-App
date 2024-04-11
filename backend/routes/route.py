from fastapi import APIRouter, HTTPException
from bson import ObjectId
from models.users import User
from models.login import Login
from models.add_items import Add_items
from models.update_items import Update_items
from models.delete_product import Delete_product
from models.forgot_password import Forgot_password
from models.otp import Otp
from models.update_password import Update_password
from config.database import collection_name
from config.database import product_name
from schema.schemas import list_serial, individual_serial_item, list_serial_items
import uuid
import random
import smtplib
from email.mime.text import MIMEText


router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Welcome to Farmer's App"}

@router.post("/signup")
async def sign_up(user: User):
    try:
        existing_user = collection_name.find_one({"$or": [{"username": user.username}, {"email": user.email}]})
        if existing_user:
            raise HTTPException(status_code=400, detail="Username or email already exists")

        user_id = str(uuid.uuid4())

        if user.usertype.lower() == "seller":
            seller_id = str(uuid.uuid4())
            user_data = user.dict()
            user_data["Seller_id"] = seller_id
        else:
            user_data = user.dict()
            user_data["user_id"] = user_id

        result = collection_name.insert_one(user_data)
        return {"message": "User created successfully", "id": str(result.inserted_id)}

    except Exception as e:
        return {"error": str(e)}
    
@router.get("/user_id/{username}")
async def get_user_id(username: str):
    try:
        user = collection_name.find_one({"username": username})
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")

        # Check if the user is a seller or a regular user
        if "Seller_id" in user:
            return {"seller_id": user["Seller_id"], "user_type": "seller"}
        else:
            return {"user_id": str(user["user_id"]), "user_type": "consumer"}

    except Exception as e:
        return {"error": str(e)}

@router.post("/login")
async def login(login_data: Login):
    try:
        user = collection_name.find_one({"username": login_data.username, "password": login_data.password})

        if user is None:
            raise HTTPException(status_code=401, detail="Invalid username or password")
        else:
            return {"message": "Login successful"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/add_items")
async def add_items(items_data: Add_items):
    try:
        # Use POST for adding items
        seller = get_seller(items_data.seller_id)
        if seller is None or seller.get('usertype') != 'Seller':
            raise HTTPException(status_code=404, detail="Seller not found or is not a seller")

        expiry_date_str = str(items_data.expiry_date)
        manufacture_date_str = str(items_data.manufacture_date)

        product_id = str(uuid.uuid4())

        item_data = {
            "Product ID": product_id,
            "Seller ID": items_data.seller_id,
            "Price": items_data.price,
            "Product Name": items_data.product_name,
            "Category": items_data.category,
            "Img URL": items_data.img_url,
            "Expiry Date": expiry_date_str,
            "Manufacture Date": manufacture_date_str,
            "Quantity": items_data.quantity
        }

        result = product_name.insert_one(item_data)

        return {"message": "Item added successfully", "id": str(result.inserted_id)}

    except Exception as e:
        return {"error": str(e)}

def get_seller(seller_id: str):
    seller = collection_name.find_one({"Seller_id": seller_id})
    return seller

@router.put("/update_items")
async def update_items(items_data: Update_items):
    try:
        # Use PUT for updating items
        product = product_name.find_one({"Product ID": items_data.product_id, "Seller ID": items_data.seller_id})

        if product is None:
            raise HTTPException(status_code=404, detail="The product does not exist")

        product_name.update_one(
            {"Product ID": items_data.product_id, "Seller ID": items_data.seller_id},
            {"$set": {"Quantity": items_data.quantity}}
        )

        product_name.update_one(
            {"Product ID": items_data.product_id, "Seller ID": items_data.seller_id},
            {"$set": {"Price": items_data.price}}
        )

        return {"message": "Item updated successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/delete_product")
async def delete_product(items_data: Delete_product):
    try:
        # Use DELETE for deleting items
        product = get_product(items_data.product_id, items_data.seller_id)
        if product is None:
            raise HTTPException(status_code=404, detail="Product not found or does not belong to the specified seller")

        delete_product_from_database(items_data.product_id, items_data.seller_id)

        return {"message": "Product deleted successfully"}

    except Exception as e:
        return {"error": str(e)}

def get_product(product_id: str, seller_id: str):
    product = product_name.find_one({"Product ID": product_id, "Seller ID": seller_id})
    return product

def delete_product_from_database(product_id: str, seller_id: str):
    product_name.delete_one({"Product ID": product_id, "Seller ID": seller_id})

@router.post("/forgot_password")
async def forgot_password(items_data: Forgot_password):
    try:
        # Use POST for forgot password
        user = get_user_by_email(items_data.email)
        if user is None:
            raise HTTPException(status_code=404, detail="Email not found in the database")

        otp = generate_otp()

        update_otp(items_data.email, otp)

        send_otp_to_email(items_data.email, otp)

        return {"message": "OTP sent successfully"}

    except Exception as e:
        return {"error": str(e)}

def get_user_by_email(email: str):
    user = collection_name.find_one({"email": email})
    return user

def generate_otp():
    return str(random.randint(1000, 9999))

def update_otp(email: str, otp: str):
    collection_name.update_one({"email": email}, {"$set": {"otp": otp}})

def send_otp_to_email(email: str, otp: str):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    sender_email = "saajhabari@gmail.com"
    sender_password = "jzrsukermuevwgcv"
    receiver_email = email

    message = MIMEText(f'Your OTP is: {otp}')

    message['Subject'] = 'OTP for password reset'
    message['From'] = sender_email
    message['To'] = receiver_email

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, message.as_string())

@router.post("/otp")
async def verify_otp(items_data: Otp):
    try:
        # Use POST for OTP verification
        user_data = collection_name.find_one({"email": items_data.email})
        if user_data:
            if user_data.get("otp") == items_data.otp:
                return {"message": "OTP verified successfully"}
            else:
                raise HTTPException(status_code=400, detail="Invalid OTP")
        else:
            raise HTTPException(status_code=404, detail="User not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/update_password")
async def update_password(items_data: Update_password):
    try:
        # Use PUT for updating password
        user_data = collection_name.find_one({"email": items_data.email})
        if user_data:
            if user_data.get("otp") == items_data.otp:
                collection_name.update_one({"email": items_data.email}, {"$set": {"password": items_data.new_password}})
                return {"message": "Password updated successfully"}
            else:
                raise HTTPException(status_code=400, detail="Invalid OTP")
        else:
            raise HTTPException(status_code=404, detail="User not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
