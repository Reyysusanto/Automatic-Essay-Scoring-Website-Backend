# app/services/predictor_sbert.py
import torch
import torch.nn.functional as F
from app.models.sbert_model import model

def predict_score_sbert(soal: str, jawaban: str, kunci_jawaban: str) -> float:
    """
    Menghitung skor kesamaan semantik antara jawaban mahasiswa dengan kunci jawaban
    menggunakan model SBERT fine-tuned AES.
    """

    # Jika jawaban identik dengan kunci jawaban, beri nilai sempurna
    if jawaban.strip().lower() == kunci_jawaban.strip().lower():
        return 100.0

    # Format input: kita bisa gabungkan pertanyaan dengan kunci jawaban (optional)
    sentence1 = f"Q: {soal} Ref: {kunci_jawaban}"
    sentence2 = jawaban

    # Encode kedua kalimat menjadi embedding tensor
    emb1 = model.encode(sentence1, convert_to_tensor=True)
    emb2 = model.encode(sentence2, convert_to_tensor=True)

    # Hitung cosine similarity (-1 .. 1)
    cosine_sim = F.cosine_similarity(emb1.unsqueeze(0), emb2.unsqueeze(0)).item()

    # Ubah jadi skala 0–1
    normalized_sim = (cosine_sim + 1) / 2

    # Konversi ke skala 0–100
    score = round(normalized_sim * 100, 2)

    # Pastikan skor tetap di antara 0–100
    score = max(0, min(100, score))
    return score
