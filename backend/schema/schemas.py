from pydantic import BaseModel

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
