from pydantic import BaseModel

class Update_password(BaseModel):
    email: str
    otp: str
    new_password: str