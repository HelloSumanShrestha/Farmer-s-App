# main

from datetime import date
from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel

# main.py

class Users(BaseModel):
    id : str 
    name: str
    description: str = None

app = FastAPI()

# mongoDB connection URL

MONGO_URL = "Your MongoDB Driver URL"

client = AsyncIOMotorClient(MONGO_URL)
database = client["mydatabase"]
collection = database["Users"]

# end-points

@app.post("/users/", response_model=Users)
async def create_item(item: Users):
    
    result = await collection.insert_one(item.dict())
    item.id = str(result.inserted_id)
    
    return item

@app.get("/users/{item_id}", response_model=Users)
async def read_item(item_id: str):
    
    item = await collection.find_one({"_id": item_id})
    
    if item:
        return item
    
    raise HTTPException(status_code=404, detail="Item not found")

@app.put("/users/{item_id}", response_model=Users)
async def update_item(item_id: str, item: Users):
    
    updated_item = await collection.find_one_and_update(
        {"_id": item_id}, {"$set": item.dict()}
    )
    
    if updated_item:
        return item
    
    raise HTTPException(status_code=404, detail="Item not found")

@app.delete("/users/{item_id}", response_model=Users)
async def delete_item(item_id: str):
    
    deleted_item = await collection.find_one_and_delete({"_id": item_id})
    
    if deleted_item:
        return deleted_item
    
    raise HTTPException(status_code=404, detail="Item not found")
