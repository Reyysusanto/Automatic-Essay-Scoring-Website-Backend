from fastapi import FastAPI
from app.api import endpoints

app = FastAPI(title="AES ML Service (IndoBERT + Cosine Similarity)")

app.include_router(endpoints.router)
