from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.schemas.request import EssayRequest
from app.schemas.response import EssayResponse, EssayData
from app.services.predictor_indobert import predict_score_indobert
from app.services.predictor_tfidf import predict_score_tfidf

router = APIRouter()

@router.post("/score", response_model=EssayResponse)
def get_score(request: EssayRequest):
    try:
        bert_score = predict_score_indobert(request.soal, request.jawaban, request.kunci_jawaban)
        
        tfidf_score = predict_score_tfidf(request.jawaban, request.kunci_jawaban)

        essay_data = EssayData(
            score_indobert=bert_score,
            score_tfidf=tfidf_score
        )

        return EssayResponse(
            status=True,
            message="Essay scored successfully",
            timestamp=datetime.utcnow(),
            data=essay_data.dict()
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to score essay: {str(e)}")
