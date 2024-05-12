from fastapi import FastAPI
from routes.auth_routes import auth_router
from routes.admin_routes import admin_router
from routes.seller_routes import seller_router
from routes.product_routes import product_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(product_router)
app.include_router(seller_router)
app.include_router(admin_router)