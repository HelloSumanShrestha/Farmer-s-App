from pymongo import MongoClient

# MongoDB Atlas connection URI
MONGODB_URI = "mongodb+srv://Prithak:Bantawa04@colab.mv3rzvo.mongodb.net/?retryWrites=true&w=majority&appName=Colab"

# Connect to the MongoDB client
client = MongoClient(MONGODB_URI)

# Get the user_db database
db = client.user_db

# Get the usersdata_collection collection
collection_name = db["user_collection"]
