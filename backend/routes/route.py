from fastapi import APIRouter, HTTPException
from models.users import User
from models.login import Login
from models.add_items import Add_items
from models.update_items import Update_items
from models.add_to_cart import Add_to_cart
from config.database import collection_name
from config.database import product_name
from config.database import cart_items
from schema.schemas import list_serial, individual_serial_item, individual_serial_cart,list_serial_items,list_serial_cart

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Welcome to Farmer's App"}

# Get Request Method
@router.get("/create_user")
async def Create():
    return {"Farmer's": "App"}

# POST Request Method
@router.post("/signup")
async def sign_up(user: User):
    try:

        existing_user = collection_name.find_one({"$or": [{"username": user.username}, {"email": user.email}]})
        if existing_user:
            raise HTTPException(status_code=400, detail="Username or email already exists")
        
        # If username and email don't exist, insert the new user into the database
        result = collection_name.insert_one(user.dict())
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
    
# Define your route
@router.post("/add_items")
async def add_items(items_data: Add_items):
    try:
        # Convert date objects to strings
        expiry_date_str = str(items_data.expiry_date)
        manufacture_date_str = str(items_data.manufacture_date)

        # Construct the item data dictionary
        item_data = {
            "Seller Id": items_data.seller_id,
            "Price": items_data.price,
            "Product Name": items_data.product_name,
            "Description": items_data.description,
            "Expiry Date": expiry_date_str,
            "Manufacture Date": manufacture_date_str,
            "Quantity": items_data.quantity
        }

        # Insert the item data into the database
        result = product_name.insert_one(item_data)
        
        return {"message": "Item added successfully", "id": str(result.inserted_id)}
    
    # Handle exceptions
    except Exception as e:
        return {"error": str(e)}
    
@router.post("/update_items")
async def update_items(items_data: Update_items):
    try:
        # Check if the product exists in the database
        product = product_name.find_one({"Product Name": items_data.product_name})

        if product is None:
            # If the product does not exist, raise an HTTPException
            raise HTTPException(status_code=404, detail="The product does not exist")
        else:
            # If the product exists, update the quantity
            existing_quantity = product["Quantity"]
            new_quantity = existing_quantity + items_data.quantity

            # Update the quantity in the database
            product_name.update_one(
                {"Product Name": items_data.product_name},
                {"$set": {"Quantity": new_quantity}}
            )

            # Fetch existing seller IDs and append the new one
            existing_seller_ids = product.get("Seller Id", "")
            new_seller_ids = f"{existing_seller_ids},{items_data.seller_id}" if existing_seller_ids else items_data.seller_id

            # Update the seller IDs in the database
            product_name.update_one(
                {"Product Name": items_data.product_name},
                {"$set": {"Seller Id": new_seller_ids}}
            )

            # Fetch existing price and append the new one
            existing_price = product.get("Price", "")
            new_price = f"{existing_price},{items_data.price}" if existing_price else items_data.price

            # Update the price in the database
            product_name.update_one(
                {"Product Name": items_data.product_name},
                {"$set": {"Price": new_price}}
            )

        return {"message": "Item updated successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# @router.post("/add_to_cart")
# async def add_to_cart(items_data: Add_to_cart):
#     try:
#         # Check if the user exists in the database
#         user = collection_name.find_one({"username": items_data.username})
#         if user is None:
#             raise HTTPException(status_code=404, detail="User does not exist")
        
#         # Check if the product exists in the database
#         product = product_name.find_one({"Product Name": items_data.product_name})
#         if product is None:
#             raise HTTPException(status_code=404, detail="The product does not exist")
        
#         # Check if the quantity of the product is greater than 0
#         if product["Quantity"] <= 0:
#             raise HTTPException(status_code=400, detail="Product is out of stock")

#         # Update product quantity in the product_collection
#         new_quantity = product["Quantity"] - items_data.quantity
#         product_name.update_one(
#             {"Product Name": items_data.product_name},
#             {"$set": {"Quantity": new_quantity}}
#         )

#         # Construct the item data dictionary for the cart
#         cart_item_data = {
#             "username": items_data.username,
#             "product_name": items_data.product_name,
#             "quantity": items_data.quantity,
#             "price": product["Price"]
#         }

#         # Insert the item into the cart_items collection
#         result = cart_items.insert_one(cart_item_data)

#         return {"message": "Item added to cart successfully"}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
