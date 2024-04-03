from fastapi import APIRouter
from models.users import User
from config.database import collection_name
from schema.schemas import list_serial

router = APIRouter()

# Get Request Method
@router.get("/")
async def get_users():
    users = list_serial(collection_name.find())
    return users

# POST Request Method
@router.post("/")
async def post_user(user: User):
    try:
        result = collection_name.insert_one(user.dict())
        return {"message": "User created successfully", "id": str(result.inserted_id)}
    except Exception as e:
        return {"error": str(e)}
