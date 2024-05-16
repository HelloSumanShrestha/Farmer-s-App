from pydantic import BaseModel

class UserUpdate(BaseModel):
    fullname: str 
    username: str
    Address: str 
    profile_picture: str