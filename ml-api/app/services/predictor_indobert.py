import torch
import torch.nn.functional as F
from app.models.indobert_model import tokenizer, model

def get_embedding(text: str):
    # embedding IndoBERT 
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=256
    )
    with torch.no_grad():
        outputs = model(**inputs)
    cls_embedding = outputs.last_hidden_state[:, 0, :] 
    return cls_embedding

def cosine_similarity(vec1, vec2):
    #Cosine similarity untuk embedding IndoBERT
    return F.cosine_similarity(vec1, vec2, dim=1).item()

def predict_score_indobert(soal: str, jawaban: str, kunci_jawaban: str) -> float:
    #Prediksi skor dengan IndoBERT embeddings
    emb_answer = get_embedding(jawaban)
    emb_key = get_embedding(kunci_jawaban)

    sim = cosine_similarity(emb_answer, emb_key)

    score = max(0, min(100, sim * 100))
    return round(score, 2)
