from fastapi import FastAPI
from app.api import endpoint

app = FastAPI(title="AES ML Service (IndoBERT + Cosine Similarity)")

app.include_router(endpoint.router)
