from fastapi import APIRouter, HTTPException, Query
from config.database import customer_db, seller_db, collection_name
from bson import ObjectId

admin_router = APIRouter()

@admin_router.get("/user_id", tags=["Admin"])
async def get_user_info(user_type: str, user_id: str):
    try:
        if user_type.lower() == "customer":
            user_info = list(customer_db.find({"Customer_ID": user_id}))
            if not user_info:
                raise HTTPException(status_code=404, detail=f"No customer found with ID '{user_id}'")
        elif user_type.lower() == "seller":
            user_info = list(seller_db.find({"Seller_ID": user_id}))
            if not user_info:
                raise HTTPException(status_code=404, detail=f"No seller found with ID '{user_id}'")
        else:
            raise HTTPException(status_code=400, detail="Invalid user type. Please provide 'customer' or 'seller'.")

        # Convert ObjectId to string if present
        for item in user_info:
            for key, value in item.items():
                if isinstance(value, ObjectId):
                    item[key] = str(value)

        return user_info

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# @admin_router.get("/user_count", tags=["Admin"])
# async def get_user_info():
#     try:
#         # Count the number of customers
#         num_customers = collection_name.count_documents({"usertype": "Customer"})

#         # Count the number of sellers
#         num_sellers = collection_name.count_documents({"usertype": "Seller"})

#         return {"Cutomers": num_customers, "Seller": num_sellers}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
    
@admin_router.get("/user_info", tags=["Admin"])
async def get_user_info(user_type: str = Query(..., description="Type of user (customer or seller)")):
    try:
        user_info = None
        if user_type.lower() == "customer":
            user_info = list(collection_name.find({"usertype": "Customer"}))
        elif user_type.lower() == "seller":
            user_info = list(collection_name.find({"usertype": "Seller"}))
        else:
            raise HTTPException(status_code=400, detail="Invalid user type. Please provide 'customer' or 'seller'.")

        if not user_info:
            raise HTTPException(status_code=404, detail=f"No {user_type.lower()}s found.")

        # Get counts
        num_customers = collection_name.count_documents({"usertype": "Customer"})
        num_sellers = collection_name.count_documents({"usertype": "Seller"})

        # Convert ObjectId to string if present
        for item in user_info:
            for key, value in item.items():
                if isinstance(value, ObjectId):
                    item[key] = str(value)

        # Add counts to the response
        response = {"Count": {"Customers": num_customers, "Sellers": num_sellers}, "User_Info": user_info}
        return response

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))