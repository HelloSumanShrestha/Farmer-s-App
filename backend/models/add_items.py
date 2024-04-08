from pydantic import BaseModel
from datetime import date

class Add_items(BaseModel):
    seller_id: str
    price: float
    product_name: str
    description: str
    expiry_date: date
    manufacture_date: date
    quantity: int
