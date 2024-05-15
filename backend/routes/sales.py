import aiomysql
from fastapi import APIRouter, HTTPException, Body, Depends
from typing import List, Dict
from database.database import get_connection
from models.sales import Sales

router = APIRouter()


@router.get("/sales/summary/{seller_id}", response_model=Dict[str, int], tags=["Sales"])
async def get_sales_summary(seller_id: int, conn=Depends(get_connection)):
    async with conn.cursor(aiomysql.DictCursor) as cursor:
        try:
            # Get total sales amount
            await cursor.execute("SELECT SUM(price * quantity) AS total_sales FROM sales WHERE sellerId = %s", (seller_id,))
            total_sales = await cursor.fetchone()
            
            # Get total products sold
            await cursor.execute("SELECT SUM(quantity) AS total_products FROM sales WHERE sellerId = %s", (seller_id,))
            total_products = await cursor.fetchone()

            return {
                "total_sales": total_sales["total_sales"] or 0,
                "total_products": total_products["total_products"] or 0
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error retrieving sales summary: {e}")

@router.post("/sales/", response_model=Sales, tags=["Sales"])
async def create_sale(sale: Sales, conn=Depends(get_connection)):
    async with conn.cursor() as cursor:
        try:
            # Insert the sale record
            await cursor.execute(
                "INSERT INTO sales (sellerId, customerId, quantity, salesDate, price, productId) VALUES (%s, %s, %s, %s, %s, %s)",
                (sale.sellerId, sale.customerId, sale.quantity, sale.salesDate, sale.price, sale.productId)
            )
            await conn.commit()

            # Update the product quantity
            await cursor.execute(
                "UPDATE products SET productQuantity = productQuantity - %s WHERE productId = %s",
                (sale.quantity, sale.productId)
            )
            await conn.commit()

            return sale
        except Exception as e:
            await conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error creating sale: {e}")
        

@router.get("/sales/", response_model=List[Sales], tags=["Sales"])
async def get_all_sales(conn=Depends(get_connection)):
    async with conn.cursor(aiomysql.DictCursor) as cursor:
        try:
            await cursor.execute("SELECT * FROM sales")
            return await cursor.fetchall()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error retrieving sales: {e}")


@router.get("/sales/{sales_id}", response_model=Sales, tags=["Sales"])
async def get_sales(sales_id: int, conn=Depends(get_connection)):
    async with conn.cursor(aiomysql.DictCursor) as cursor:
        try:
            await cursor.execute("SELECT * FROM sales WHERE SalesNumber = %s", (sales_id,))
            sales = await cursor.fetchone()
            if not sales:
                raise HTTPException(status_code=404, detail="Sales not found")
            return sales
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error retrieving sales: {e}")


@router.get("/sales/seller/{seller_id}", response_model=List[Sales], tags=["Sales"])
async def get_sales_by_seller(seller_id: int, conn=Depends(get_connection)):
    async with conn.cursor(aiomysql.DictCursor) as cursor:
        try:
            await cursor.execute("SELECT * FROM sales WHERE sellerId = %s", (seller_id,))
            sales = await cursor.fetchall()
            return sales
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error retrieving sales: {e}")


@router.get("/sales/customer/{customer_id}", response_model=List[Sales], tags=["Sales"])
async def get_sales_by_customer(customer_id: int, conn=Depends(get_connection)):
    async with conn.cursor(aiomysql.DictCursor) as cursor:
        try:
            await cursor.execute("SELECT * FROM sales WHERE customerId = %s", (customer_id,))
            sales = await cursor.fetchall()
            return sales
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error retrieving sales: {e}")