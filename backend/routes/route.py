from fastapi import APIRouter, HTTPException, Depends, Query, status
from bson import ObjectId
from datetime import datetime, timedelta
from jose import JWTError, jwt
from models.users import User
from models.login import Login
from models.add_items import Add_items
from models.update_items import Update_items
from models.delete_product import Delete_product
from models.forgot_password import Forgot_password
from models.otp import Otp
from models.update_password import Update_password
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
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
        # Check if the user already exists
        existing_user = collection_name.find_one({"$or": [{"username": user.username}, {"email": user.email}]})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username or email already exists"
            )

        user_id = str(uuid.uuid4())  
        user_data = user.dict()

        # Assign a unique seller ID if the user is a seller, else assign a user ID
        if user.usertype.lower() == "seller":
            seller_id = str(uuid.uuid4()) 
            user_data["Seller_id"] = seller_id
            user_type = "Seller"
        else:
            user_data["user_id"] = user_id
            user_type = "Customer"

        # Insert the new user into the database
        result = collection_name.insert_one(user_data)
        return {"message": "User created successfully", "id": str(result.inserted_id)}
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))
    
@router.get("/user_id/{username}")
async def get_user_id(username: str):
    try:
        # Check if the username exists
        user = collection_name.find_one({"username": username})
        if user is None:
            # Return HTTP 404 status code if user is not found
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

        # Check if the user is a seller or a regular user
        if "Seller_id" in user:
            return {"seller_id": user["Seller_id"], "user_type": "seller"}
        else:
            return {"user_id": str(user["user_id"]), "user_type": "consumer"}

    except HTTPException as e:
        raise  # Re-raise HTTPExceptions to maintain the original status code and detail message

    except KeyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="User data format error")

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/login")
async def login(login_data: Login):
    try:
        # Check if the username with the password exists or not
        user = collection_name.find_one({"username": login_data.username, "password": login_data.password})

        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")
        
        return {"message": "Login successful"}

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))


@router.post("/add_items")
async def add_items(items_data: Add_items):
    try:
        # Use POST for adding items
        seller = get_seller(items_data.seller_id)
        if seller is None or seller.get('usertype') != 'Seller':
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Seller not found or is not a seller")

        expiry_date_str = str(items_data.expiry_date)
        manufacture_date_str = str(items_data.manufacture_date)

        product_id = str(uuid.uuid4())

        item_data = {
            "Product_ID": product_id,
            "Seller_ID": items_data.seller_id,
            "Price": items_data.price,
            "Product_Name": items_data.product_name,
            "Category": items_data.category,
            "Img_URL": items_data.img_url,
            "Expiry_Date": expiry_date_str,
            "Manufacture_Date": manufacture_date_str,
            "Quantity": items_data.quantity
        }

        result = product_name.insert_one(item_data)

        return {"message": "Item added successfully", "id": str(result.inserted_id)}

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

def get_seller(seller_id: str):
    seller = collection_name.find_one({"Seller_id": seller_id})
    return seller

@router.put("/update_items")
async def update_items(items_data: Update_items):
    try:

        product = product_name.find_one({"Product_ID": items_data.product_id, "Seller_ID": items_data.seller_id})

        if product is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="The product does not exist")

        product_name.update_one(
            {"Product_ID": items_data.product_id, "Seller_ID": items_data.seller_id},
            {"$set": {"Quantity": items_data.quantity}}
        )

        product_name.update_one(
            {"Product_ID": items_data.product_id, "Seller_ID": items_data.seller_id},
            {"$set": {"Price": items_data.price}}
        )

        return {"message": "Item updated successfully"}

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

@router.delete("/delete_product")
async def delete_product(items_data: Delete_product):
    try:

        product = get_product(items_data.product_id, items_data.seller_id)
        if product is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found or does not belong to the specified seller")

        delete_product_from_database(items_data.product_id, items_data.seller_id)

        return {"message": "Product deleted successfully"}

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

def get_product(product_id: str, seller_id: str):
    product = product_name.find_one({"Product_ID": product_id, "Seller_ID": seller_id})
    return product

def delete_product_from_database(product_id: str, seller_id: str):
    product_name.delete_one({"Product_ID": product_id, "Seller_ID": seller_id})
    
    
@router.post("/forgot_password")
async def forgot_password(items_data: Forgot_password):
    try:

        user = get_user_by_email(items_data.email)
        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Email not found in the database")

        otp = generate_otp()
        update_otp(items_data.email, otp)
        send_otp_to_email(items_data.email, otp)

        return {"message": "OTP sent successfully"}, status.HTTP_200_OK

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

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
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OTP")
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

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
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OTP")
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

@router.get("/products")
async def get_products():
    try:
        products_cursor = product_name.find()

        products = list(products_cursor)

        if len(products) == 0:
            raise HTTPException(status_code=404, detail="No products found")

        product_info_list = []

        for product in products:
            product_info = {
                "Product_ID": product["Product_ID"],
                "Seller_ID": product["Seller_ID"],
                "Price": product["Price"],
                "Product_Name": product["Product_Name"],
                "Category": product["Category"],
                "Img_URL": product["Img_URL"],
                "Expiry_Date": product["Expiry_Date"],
                "Manufacture_Date": product["Manufacture_Date"],
                "Quantity": product["Quantity"]
            }
            product_info_list.append(product_info)

        return product_info_list

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

    
@router.get("/seller_products/{seller_id}")
async def get_seller_products(seller_id: str):
    try:

        products_cursor = product_name.find({"Seller ID": seller_id})

        seller_products = list(products_cursor)

        if len(seller_products) == 0:
            raise HTTPException(status_code=404, detail="No products found for the specified seller")

        product_info_list = []

        for product in seller_products:
            product_info = {
                "Product_ID": product["Product_ID"],
                "Seller_ID": product["Seller_ID"],
                "Price": product["Price"],
                "Product_Name": product["Product_Name"],
                "Category": product["Category"],
                "Img_URL": product["Img_URL"],
                "Expiry_Date": product["Expiry_Date"],
                "Manufacture_Date": product["Manufacture_Date"],
                "Quantity": product["Quantity"]
            }
            product_info_list.append(product_info)

        return product_info_list

    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))

@router.get("/category/{category_name}")
async def get_products_by_category(category_name: str):
    try:

        products_cursor = product_name.find({"Category": category_name})

        products = list(products_cursor)

        if len(products) == 0:
            raise HTTPException(status_code=404, detail="No products found for the specified category")

        product_info_list = []

        for product in products:
            product_info = {
                "Product_ID": product["Product_ID"],
                "Seller_ID": product["Seller_ID"],
                "Price": product["Price"],
                "Product_Name": product["Product_Name"],
                "Category": product["Category"],
                "Img_URL": product["Img_URL"],
                "Expiry_Date": product["Expiry_Date"],
                "Manufacture_Date": product["Manufacture_Date"],
                "Quantity": product["Quantity"]
            }
            product_info_list.append(product_info)

        return product_info_list

    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))

@router.get("/items")
async def read_items(skip: int = 0, limit: int = 10):
    try:
        products_cursor = product_name.find().skip(skip).limit(limit)
        products = list(products_cursor)

        if len(products) == 0:
            raise HTTPException(status_code=404, detail="No products found")

        product_info_list = []

        for product in products:
            product_info = {
                "Product_ID": product["Product_ID"],
                "Seller_ID": product["Seller_ID"],
                "Price": product["Price"],
                "Product_Name": product["Product_Name"],
                "Category": product["Category"],
                "Img_URL": product["Img_URL"],
                "Expiry_Date": product["Expiry_Date"],
                "Manufacture_Date": product["Manufacture_Date"],
                "Quantity": product["Quantity"]
            }
            product_info_list.append(product_info)

        return product_info_list

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Secret key and algorithm for JWT token generation
SECRET_KEY = "khoi_khoi"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Function to create JWT token
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.get("/encrypt")
async def encrypt_data(data: str):
    try:
        # Generate JWT token containing the input data
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"data": data}, expires_delta=access_token_expires)

        return {"encrypted_token": access_token}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

