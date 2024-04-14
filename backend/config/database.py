from pymongo import MongoClient

MONGODB_URI = f"mongodb+srv://Prithak:Bantawa041124@colab.mv3rzvo.mongodb.net/?retryWrites=true&w=majority&appName=Colab"

client = MongoClient(MONGODB_URI)

db = client.user_db
i_db = client.item_db

collection_name = db["user_collection"]
product_name = i_db["product_collection"]
