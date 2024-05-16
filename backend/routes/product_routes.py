from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pymongo import MongoClient
from datetime import datetime
from models.add_items import Add_items
from models.update_items import Update_items
from models.delete_product import Delete_product
from models.UserRequest import UserRequest
from bson import ObjectId
from config.database import product_name
from config.database import customer_db
from config.database import seller_db
from config.database import collection_name
import uuid
from uuid import uuid4

product_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@product_router.get("/products", tags=["Product"])
async def get_products():
    try:
        current_date = datetime.utcnow()  # Get current date and time

        # Query products from the database
        products_cursor = product_name.find()

        products = list(products_cursor)

        if len(products) == 0:
            raise HTTPException(status_code=404, detail="No products found")

        product_info_list = []

        for product in products:
            # Parse the date string into a datetime object
            expiry_date = datetime.strptime(product["Expiry_Date"], "%Y-%m-%d")
            # print("Expiry Date:", expiry_date)
            # print("Current Date:", current_date)
            # if expiry_date > current_date:
            #     print("Product is not expired")
            # else:
            #     print("Product is expired")

            # Check if the product has not expired
            if expiry_date > current_date:
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
    
@product_router.post("/process_order", tags=["Order"])
async def process_order(product_id: str, quantity: int, user_id: str):
    try:
        # Check if the product with the given product_id exists
        product = product_name.find_one({"Product_ID": product_id})
        if product is None:
            raise HTTPException(status_code=404, detail=f"Product with ID '{product_id}' not found")

        # Check if there is enough quantity of the selected product
        if product["Quantity"] < quantity:
            raise HTTPException(status_code=400, detail="Product is out of stock")

        # Update the quantity of the selected product
        new_quantity = product["Quantity"] - quantity
        product_name.update_one({"Product_ID": product_id}, {"$set": {"Quantity": new_quantity}})

        # Generate a random order_id
        order_id = str(uuid4())

        # Get customer name
        customer = collection_name.find_one({"user_id": user_id})
        if customer is None:
            raise HTTPException(status_code=404, detail=f"Customer with ID '{user_id}' not found")
        customer_name = customer["fullname"]

        # Get seller name
        seller_id = product["Seller_ID"]
        seller = collection_name.find_one({"Seller_id": seller_id})
        if seller is None:
            raise HTTPException(status_code=404, detail=f"Seller with ID '{seller_id}' not found")
        seller_name = seller["fullname"]

        # Calculate the total cost
        total_cost = product["Price"] * quantity

        # Check if the order already exists
        existing_order = customer_db.find_one({
            "Customer_ID": user_id,
            "Seller_ID": seller_id,
            "Product_ID": product_id
        })

        if existing_order:
            # If order exists, update the quantity for both customer and seller
            updated_quantity = existing_order["Quantity"] + quantity
            new_total_cost = updated_quantity * product["Price"]
            customer_db.update_one({
                "Customer_ID": user_id,
                "Seller_ID": seller_id,
                "Product_ID": product_id
            }, {"$set": {"Quantity": updated_quantity, "Total_Cost": new_total_cost}})

            # Update quantity in seller_db and earnings
            seller_order = seller_db.find_one({
                "Seller_ID": seller_id,
                "Customer_ID": user_id,
                "Product_ID": product_id
            })
            if seller_order:
                seller_db.update_one({
                    "Seller_ID": seller_id,
                    "Customer_ID": user_id,
                    "Product_ID": product_id
                }, {"$set": {"Quantity": updated_quantity, "Earnings": new_total_cost}})
            else:
                raise HTTPException(status_code=500, detail="Order exists in customer_db but not in seller_db")
        else:
            # Store the order in the database with the generated order_id
            order_data = {
                "order_id": order_id,
                "Customer_ID": user_id,
                "Customer_Name": customer_name,
                "Seller_ID": seller_id,
                "Seller_Name": seller_name,
                "Product_ID": product_id,
                "Product_Name": product["Product_Name"],
                "Price": product["Price"],
                "Category": product["Category"],
                "Quantity": quantity,
                "Total_Cost": total_cost,
                "Expiry_Date": product["Expiry_Date"],
                "Manufacture_Date": product["Manufacture_Date"],
                "Img_URL": product["Img_URL"],
                "order": "Pending"
            }
            customer_db.insert_one(order_data)

            # Insert order into seller_collection with the same order_id and earnings
            seller_order_data = {
                "order_id": order_id,
                "Seller_ID": seller_id,
                "Seller_Name": seller_name,
                "Customer_ID": user_id,
                "Customer_Name": customer_name,
                "Product_ID": product_id,
                "Product_Name": product["Product_Name"],
                "Price": product["Price"],
                "Category": product["Category"],
                "Quantity": quantity,
                "Earnings": total_cost,
                "Expiry_Date": product["Expiry_Date"],
                "Manufacture_Date": product["Manufacture_Date"],
                "Img_URL": product["Img_URL"],
                "order": "Pending"
            }
            seller_db.insert_one(seller_order_data)

        return {"message": "Order processed successfully"}

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@product_router.get("/order_count", tags=["Order"])
async def get_order_count():
    try:
        # Count the number of orders
        num_orders = customer_db.count_documents({})

        return {"OrderCount": num_orders}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Endpoint to update order status
@product_router.get("/update_order_status", tags=["Order"])
async def update_order_status(seller_id: str, order_id: str, new_status: str):
    try:
        # Check if the seller exists
        seller = get_seller(seller_id)
        if seller is None or seller.get('usertype') != 'Seller':
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Seller not found or is not a seller")

        # Retrieve order details from seller collection
        order = seller_db.find_one({"Seller_ID": seller_id, "order_id": order_id})
        if order is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")

        # Update order status in seller collection
        seller_db.update_one({"Seller_ID": seller_id, "order_id": order_id}, {"$set": {"order": new_status}})

        # Update order status in customer collection as well
        customer_db.update_one({"Customer_ID": order["Customer_ID"], "order_id": order_id}, {"$set": {"order": new_status}})

        # Return a simple message confirming the update
        return {"message": "Order status has been updated successfully."}

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

def get_seller(seller_id: str):
    seller = collection_name.find_one({"Seller_id": seller_id})
    return seller


    
@product_router.get("/seller_products/{seller_id}", tags=["Product"])
async def get_seller_products(seller_id: str):
    try:
        current_date = datetime.utcnow()   

        products_cursor = product_name.find({"Seller_ID": seller_id})

        seller_products = list(products_cursor)

        if len(seller_products) == 0:
            raise HTTPException(status_code=404, detail="No products found for the specified seller")

        product_info_list = []

        for product in seller_products:
            expiry_date = datetime.strptime(product["Expiry_Date"], "%Y-%m-%d")
            if expiry_date > current_date:
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

@product_router.get("/category/{category_name}", tags=["Product"])
async def get_products_by_category(category_name: str):
    try:
        current_date = datetime.utcnow()  # Get current date and time

        products_cursor = product_name.find({"Category": category_name})

        products = list(products_cursor)

        if len(products) == 0:
            raise HTTPException(status_code=404, detail="No products found for the specified category")

        product_info_list = []

        for product in products:
            expiry_date = datetime.strptime(product["Expiry_Date"], "%Y-%m-%d")
            if expiry_date > current_date:
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

@product_router.get("/items", tags=["Product"])
async def read_items(skip: int = 0, limit: int = 10):
    try:
        current_date = datetime.utcnow()  # Get current date and time

        products_cursor = product_name.find().skip(skip).limit(limit)
        products = list(products_cursor)

        if len(products) == 0:
            raise HTTPException(status_code=404, detail="No products found")

        product_info_list = []

        for product in products:
            expiry_date = datetime.strptime(product["Expiry_Date"], "%Y-%m-%d")
            if expiry_date > current_date:
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
    
@product_router.post("/get||bought_products", tags=["Order"])
async def get_sold_bought_products(user_request: UserRequest):
    try:
        usertype = user_request.usertype.lower()
        user_id = user_request.user_id

        if usertype not in ["customer", "seller"]:
            raise HTTPException(status_code=400, detail="Invalid user type. Must be 'customer' or 'seller'.")

        if usertype == "customer":
            # Query customer_db for completed orders
            completed_orders_count = customer_db.count_documents({
                "Customer_ID": user_id,
                "order": "Completed"
            })
            return {"message": "Number of products bought", "count": completed_orders_count}

        elif usertype == "seller":
            # Query seller_db for completed orders
            completed_orders_count = seller_db.count_documents({
                "Seller_ID": user_id,
                "order": "Completed"
            })
            return {"message": "Number of products sold", "count": completed_orders_count}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
