from pymongo import MongoClient

password = "wZJWGz1k7k1V6fuN"
MONGODB_URI = f"mongodb+srv://iamsuman066:{password}@colab.qykvs0f.mongodb.net/?retryWrites=true&w=majority&appName=Colab"

client = MongoClient(MONGODB_URI)

db = client.user_db
i_db = client.item_db

collection_name = db["user_collection"]
product_name = i_db["product_collection"]
