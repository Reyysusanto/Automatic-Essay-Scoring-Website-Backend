# app/models/sbert_model.py
from sentence_transformers import SentenceTransformer
import os

# Ambil nama model dari environment variable atau pakai default Hugging Face model kamu
MODEL_NAME = os.getenv("MODEL_NAME", "mferdian/sbert-finetune-aes")

# Load model SentenceTransformer
model = SentenceTransformer(MODEL_NAME)
model.eval()
