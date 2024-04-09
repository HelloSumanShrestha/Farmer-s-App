from pydantic import BaseModel

class Delete_product(BaseModel):
    product_id: str
    seller_id: str
