from fastapi import FastAPI
from app.api import endpoint

app = FastAPI(title="AES ML Service")

app.include_router(endpoint.router)
