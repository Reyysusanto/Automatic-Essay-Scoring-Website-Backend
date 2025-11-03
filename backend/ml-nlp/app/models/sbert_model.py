from sentence_transformers import SentenceTransformer
import os

MODEL_NAME = os.getenv("MODEL_NAME", "mferdian/sbert-finetune-aes")

model = SentenceTransformer(MODEL_NAME)
model.eval()
