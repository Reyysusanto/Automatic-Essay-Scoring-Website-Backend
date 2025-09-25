import joblib
from sklearn.metrics.pairwise import cosine_similarity

vectorizer = joblib.load("aes_tfidf_vectorizer.joblib")

def predict_score_tfidf(jawaban: str, kunci_jawaban: str) -> float:
    tfidf = vectorizer.transform([jawaban, kunci_jawaban])
    sim = cosine_similarity(tfidf[0], tfidf[1])[0][0]

    score = max(0, min(100, sim * 100))
    return round(score, 2)
