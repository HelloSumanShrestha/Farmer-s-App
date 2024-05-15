from fastapi import APIRouter, HTTPException, Depends
import aiomysql

from database.database import get_connection
from models.seller import Seller

router = APIRouter()

# Function to remove password from customer data
def remove_password(seller_data: dict) -> dict:
    if "sellerPassword" in seller_data:
        del seller_data["sellerPassword"]
    return seller_data

@router.post("/sellers/create", response_model=Seller, tags=["Seller"])
async def create_seller(seller: Seller, conn=Depends(get_connection)):
    async with conn.cursor() as cursor:
        try:
            sql = """
                INSERT INTO seller (sellerId, sellerName, sellerEmail, sellerPassword)
                VALUES (%s, %s, %s, %s)
            """
            await cursor.execute(sql, (seller.sellerId, seller.sellerName, seller.sellerEmail, seller.sellerPassword))
            await conn.commit()
            return seller 
        except aiomysql.Error as err:
            raise HTTPException(status_code=500, detail="Error creating seller")


@router.get("/sellers/", response_model=list[Seller], tags=["Seller"])
async def get_seller_list(conn=Depends(get_connection)):
    async with conn.cursor(aiomysql.DictCursor) as cursor:
        try:
            await cursor.execute("SELECT * FROM seller")
            sellers = await cursor.fetchall()
            return [Seller(**seller) for seller in sellers]
        except aiomysql.Error as err:
            raise HTTPException(status_code=500, detail="Error retrieving sellers")


@router.get("/sellers/{seller_id}", response_model=Seller, tags=["Seller"])
async def get_seller(seller_id: int, conn=Depends(get_connection)):
    async with conn.cursor(aiomysql.DictCursor) as cursor:
        try:
            await cursor.execute("SELECT * FROM seller WHERE sellerId = %s", (seller_id,))
            seller = await cursor.fetchone()
            if not seller:
                raise HTTPException(status_code=404, detail="Seller not found")
            return Seller(**seller)
        except aiomysql.Error as err:
            raise HTTPException(status_code=500, detail="Error retrieving seller")


@router.put("/sellers/{seller_id}", response_model=Seller, tags=["Seller"])
async def update_seller(seller_id: int, seller: Seller, conn=Depends(get_connection)):
    async with conn.cursor() as cursor:
        try:
            sql = """
                UPDATE seller SET sellerName = %s, sellerEmail = %s, sellerPassword = %s
                WHERE sellerId = %s
            """
            await cursor.execute(sql, (seller.sellerName, seller.sellerEmail, seller.sellerPassword, seller_id))
            if cursor.rowcount == 0:
                raise HTTPException(status_code=404, detail="Seller not found")
            await conn.commit()
            return seller
        except aiomysql.Error as err:
            print(err)  # Print the error for debugging purposes
            raise HTTPException(status_code=500, detail="Error updating seller")



# Delete a seller (implement similar logic as delete_customer)
@router.delete("/sellers/{seller_id}", tags=["Seller"])
async def delete_seller(seller_id: int, conn=Depends(get_connection)):
        async with conn.cursor() as cursor:
            try:
                await cursor.execute("DELETE FROM seller WHERE sellerId = %s", (seller_id,))
                if cursor.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Seller not found")
                await conn.commit()
                return {"message": "Seller deleted successfully"}
            except aiomysql.Error as err:
                raise HTTPException(status_code=500, detail="Error deleting seller")
