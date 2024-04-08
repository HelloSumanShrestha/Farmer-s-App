from pydantic import BaseModel
from datetime import date

class User(BaseModel):
    fullname: str
    email: str
    username: str
    password: str

def individual_serial(user) -> dict:
    return {
        "fullname": user.fullname,
        "email": user.email,
        "username": user.username,
        "password": user.password,   
    }

def list_serial(users) -> list:
    return [individual_serial(user) for user in users]

class Login(BaseModel):
    username: str
    password: str

def individual_serial(login) -> dict:
    return {

        "username": login.username,
        "password": login.password,
    }

def list_serial(logins) -> list:
    return [individual_serial(user) for user in logins]

class Add_items(BaseModel):
    seller_id: str
    price: float
    product_name: str
    description: str
    expiry_date: date
    manufacture_date: date
    quantity: int

def individual_serial_item(item: Add_items) -> dict:
    return {
        "seller_id": item.seller_id,
        "price": item.price,
        "product_name": item.product_name,
        "description": item.description,
        "expiry_date": str(item.expiry_date),  # Convert date to string
        "manufacture_date": str(item.manufacture_date),  # Convert date to string
        "quantity": item.quantity,
    }

def list_serial_items(items: list) -> list:
    return [individual_serial(item) for item in items]

class Add_to_cart(BaseModel):
    username: str
    product_name: str
    quantity: int

def individual_serial_cart(cart_item) -> dict:
    return {
        "username": cart_item.username,
        "product_name": cart_item.product_name,
        "quantity": cart_item.quantity
    }

def list_serial_cart(cart_items) -> list:
    return [individual_serial_cart(cart_item) for cart_item in cart_items]
