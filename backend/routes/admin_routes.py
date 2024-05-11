from fastapi import APIRouter, HTTPException
from config.database import customer_db, seller_db
from bson import ObjectId

admin_router = APIRouter()

@admin_router.get("/user_info")
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
