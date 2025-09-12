from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity as sklearn_cosine

def predict_score_tfidf(jawaban: str, kunci_jawaban: str) -> float:
    #Prediksi skor dengan TF-IDF Cosine Similarity
    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform([jawaban, kunci_jawaban])
    sim = sklearn_cosine(tfidf[0], tfidf[1])[0][0]

    score = max(0, min(100, sim * 100))
    return round(score, 2)
