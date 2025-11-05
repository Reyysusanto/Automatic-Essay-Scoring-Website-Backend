from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.schemas.request import EssayRequest, EssayBatchRequest
from app.schemas.response import EssayResponse, EssayData, EssayBatchResponse
from app.services.predictor_tf_idf import predict_score_tfidf
from app.services.predictor_sbert import predict_score_sbert

router = APIRouter()

@router.post("/score", response_model=EssayResponse)
async def score_essay(request: EssayRequest):
    try:
        score_tfidf = predict_score_tfidf(request.jawaban, request.kunci_jawaban)
        score_sbert = predict_score_sbert(request.soal, request.jawaban, request.kunci_jawaban)

        return EssayResponse(
            status=True,
            message="Success",
            timestamp=datetime.now(),
            data=EssayData(
                soal=request.soal,
                jawaban=request.jawaban,
                score_tfidf=score_tfidf,
                score_sbert=score_sbert
            )
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to score essay: {str(e)}")

@router.post("/score/batch", response_model=EssayBatchResponse)
async def score_batch(request: EssayBatchRequest):
    try:
        results = []
        for ans in request.answers:
            score_tfidf = predict_score_tfidf(ans.jawaban, ans.kunci_jawaban)
            score_sbert = predict_score_sbert(ans.soal, ans.jawaban, ans.kunci_jawaban)
            results.append(
                EssayData(
                    soal=ans.soal,
                    jawaban=ans.jawaban,
                    score_tfidf=score_tfidf,
                    score_sbert=score_sbert
                )
            )
        return EssayBatchResponse(
            status=True,
            message="Batch scoring successful",
            timestamp=datetime.now(),
            data=results
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Batch scoring failed: {str(e)}")
