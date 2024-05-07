from fastapi import APIRouter, HTTPException, status
from models.add_items import Add_items
from models.update_items import Update_items
from models.delete_product import Delete_product
from config.database import product_name
from config.database import collection_name
from bson import ObjectId
from datetime import datetime, timedelta
import uuid

product_router = APIRouter()

@product_router.post("/add_items")
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

@product_router.put("/update_items")
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

@product_router.delete("/delete_product")
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

@product_router.get("/products")
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

    
# @product_router.get("/seller_products/{seller_id}")
# async def get_seller_products(seller_id: str):
#     try:

#         products_cursor = product_name.find({"Seller ID": seller_id})

#         seller_products = list(products_cursor)

#         if len(seller_products) == 0:
#             raise HTTPException(status_code=404, detail="No products found for the specified seller")

#         product_info_list = []

#         for product in seller_products:
#             product_info = {
#                 "Product_ID": product["Product_ID"],
#                 "Seller_ID": product["Seller_ID"],
#                 "Price": product["Price"],
#                 "Product_Name": product["Product_Name"],
#                 "Category": product["Category"],
#                 "Img_URL": product["Img_URL"],
#                 "Expiry_Date": product["Expiry_Date"],
#                 "Manufacture_Date": product["Manufacture_Date"],
#                 "Quantity": product["Quantity"]
#             }
#             product_info_list.append(product_info)

#         return product_info_list

#     except Exception as e:

#         raise HTTPException(status_code=500, detail=str(e))    
    
@product_router.get("/seller_products/{seller_id}")
async def get_seller_products(seller_id: str):
    try:

        products_cursor = product_name.find({"Seller_ID": seller_id})

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

@product_router.get("/category/{category_name}")
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

@product_router.get("/items")
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
