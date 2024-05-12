from pydantic import BaseModel

class AddProductWithImage(BaseModel):
    seller_id: str
    price: float
    product_name: str
    category: str
    img_url: str
    expiry_date: str
    manufacture_date: str
    quantity: int