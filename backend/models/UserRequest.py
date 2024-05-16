from pydantic import BaseModel

class UserRequest(BaseModel):
    usertype: str
    user_id: str
