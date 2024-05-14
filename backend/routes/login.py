from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

from database.database import get_connection
from models.customer import Customer
from models.seller import Seller

router = APIRouter()

# Create a Pydantic model for the login request body
class LoginRequest(BaseModel):
    email: str
    password: str

# Login for customer
@router.post("/customers/login", tags=["login"])
async def customer_login(login_request: LoginRequest, conn=Depends(get_connection)):
    async with conn.cursor() as cursor:
        await cursor.execute("SELECT customerId FROM customer WHERE customerEmail = %s AND customerPassword = %s", 
                             (login_request.email, login_request.password))
        customer = await cursor.fetchone()
        if customer:
            return {"message": "Customer logged in successfully", "customerId": customer['customerId']}
        else:
            raise HTTPException(status_code=401, detail="Incorrect email or password")

# Login for seller
@router.post("/sellers/login", tags=["login"])
async def seller_login(login_request: LoginRequest, conn=Depends(get_connection)):
    async with conn.cursor() as cursor:
        await cursor.execute("SELECT sellerId FROM seller WHERE sellerEmail = %s AND sellerPassword = %s", 
                             (login_request.email, login_request.password))
        seller = await cursor.fetchone()
        if seller:
            return {"message": "Seller logged in successfully", "sellerId": seller['sellerId']}
        else:
            raise HTTPException(status_code=401, detail="Incorrect email or password")
