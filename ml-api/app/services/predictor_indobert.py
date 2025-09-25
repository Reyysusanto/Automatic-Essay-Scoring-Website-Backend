import torch
from app.models.indobert_model import tokenizer, model 

def predict_score_indobert(soal: str, jawaban: str, kunci_jawaban: str) -> float:
    if jawaban.strip().lower() == kunci_jawaban.strip().lower():
        return 100.0

    text = f"Q: {soal} [SEP] Ref: {kunci_jawaban} [SEP] Ans: {jawaban}"

    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=256
    )

    with torch.no_grad():
        outputs = model(**inputs)

    pred_score = outputs.logits.squeeze().item()
    if 0 <= pred_score <= 1:
        score = pred_score * 100
    else:
        score = pred_score
        
    score = round(max(0, min(100, score)), 2)

    return score
