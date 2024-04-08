from pydantic import BaseModel
from datetime import date

class Add_to_cart(BaseModel):

    price: float
    product_name: str
    quantity: int
