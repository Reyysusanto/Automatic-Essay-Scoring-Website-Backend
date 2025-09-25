from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.schemas.request import EssayRequest
from app.schemas.response import EssayResponse, EssayData
from app.services.predictor_tfidf import predict_score_tfidf
from app.services.predictor_indobert import predict_score_indobert

router = APIRouter()

@router.post("/score", response_model=EssayResponse)
async def score_essay(request: EssayRequest):
    try:
        score_tfidf = predict_score_tfidf(request.jawaban, request.kunci_jawaban)
        score_indobert = predict_score_indobert(request.soal, request.jawaban, request.kunci_jawaban)

        return EssayResponse(
            status=True,
            message="Success",
            timestamp=datetime.now(),
            data=EssayData(
                score_tfidf=score_tfidf,
                score_indobert=score_indobert
            )
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to score essay: {str(e)}")
