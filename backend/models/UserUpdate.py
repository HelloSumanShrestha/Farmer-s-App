from pydantic import BaseModel

class UserUpdate(BaseModel):
    fullname: str 
    username: str
    address: str 
    profile_picture: str