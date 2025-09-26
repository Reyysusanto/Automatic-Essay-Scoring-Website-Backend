import joblib
from sklearn.metrics.pairwise import cosine_similarity

tfidf_vectorizer = joblib.load("app/core/aes_tfidf_vectorizer.joblib")

def predict_score_tfidf(jawaban: str, kunci_jawaban: str) -> float:
    tfidf = tfidf_vectorizer.transform([jawaban, kunci_jawaban])
    sim = cosine_similarity(tfidf[0], tfidf[1])[0][0]

    score = max(0, min(100, sim * 100))
    return round(score, 2)
