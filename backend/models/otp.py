from pydantic import BaseModel

class Otp(BaseModel):
    email: str
    otp: str
