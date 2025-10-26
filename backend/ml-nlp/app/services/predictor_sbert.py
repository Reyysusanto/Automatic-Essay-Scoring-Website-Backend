import torch
import torch.nn.functional as F
from app.models.sbert_model import model
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def predict_score_sbert(soal: str, jawaban: str, kunci_jawaban: str) -> float:

    if jawaban.strip().lower() == kunci_jawaban.strip().lower():
        return 100.0

    sentence1 = kunci_jawaban
    sentence2 = jawaban

    emb1 = model.encode(sentence1, convert_to_tensor=True)
    emb2 = model.encode(sentence2, convert_to_tensor=True)

    cosine_sim = F.cosine_similarity(emb1.unsqueeze(0), emb2.unsqueeze(0)).item()
    score_sbert = (cosine_sim + 1) / 2 * 100  

    vectorizer = TfidfVectorizer().fit_transform([kunci_jawaban, jawaban])
    tfidf_sim = cosine_similarity(vectorizer[0:1], vectorizer[1:2])[0][0]
    score_tfidf = tfidf_sim * 100  # juga skala 0–100

    final_score = (0.8 * score_sbert) + (0.2 * score_tfidf)

    if score_tfidf < 10:   
        final_score *= 0.5 
        
    final_score = max(0.0, min(100.0, round(final_score, 2)))

    return final_score


