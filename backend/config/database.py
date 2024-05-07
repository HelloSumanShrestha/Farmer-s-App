from pymongo import MongoClient

password = "Bantawa041124"
MONGODB_URI = f"mongodb+srv://Prithak:{password}@colab.mv3rzvo.mongodb.net/?retryWrites=true&w=majority&appName=Colab"

client = MongoClient(MONGODB_URI)

db = client.user_db
i_db = client.item_db

collection_name = db["user_collection"]
product_name = i_db["product_collection"]
