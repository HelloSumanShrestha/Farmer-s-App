from fastapi import APIRouter, HTTPException
from models.users import User
from models.login import Login
from models.add_items import Add_items
from models.update_items import Update_items
from models.delete_product import Delete_product
from config.database import collection_name
from config.database import product_name
from schema.schemas import list_serial, individual_serial_item,list_serial_items
import uuid  

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
def add_items(items_data: Add_items):
    try:

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

def generate_product_id():

    pass

    
@router.post("/update_items")
async def update_items(items_data: Update_items):
    try:
        product = product_name.find_one({"Product Name": items_data.product_name})

        if product is None:

            raise HTTPException(status_code=404, detail="The product does not exist")
        else:

            existing_quantity = product["Quantity"]
            new_quantity = existing_quantity + items_data.quantity

            product_name.update_one(
                {"Product Name": items_data.product_name},
                {"$set": {"Quantity": new_quantity}}
            )

            existing_seller_ids = product.get("Seller Id", "")
            new_seller_ids = f"{existing_seller_ids},{items_data.seller_id}" if existing_seller_ids else items_data.seller_id

            product_name.update_one(
                {"Product Name": items_data.product_name},
                {"$set": {"Seller Id": new_seller_ids}}
            )

            existing_price = product.get("Price", "")
            new_price = f"{existing_price},{items_data.price}" if existing_price else items_data.price

            product_name.update_one(
                {"Product Name": items_data.product_name},
                {"$set": {"Price": new_price}}
            )

        return {"message": "Item updated successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/delete_product")
def delete_product(items_data: Delete_product):
    try:

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

