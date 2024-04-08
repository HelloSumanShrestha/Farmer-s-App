from pydantic import BaseModel
from datetime import date

class Update_items(BaseModel):
    seller_id: str
    price: float
    product_name: str
    quantity: int
