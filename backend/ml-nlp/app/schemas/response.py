from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class EssayData(BaseModel):
    soal: str
    jawaban: str
    score_tfidf: Optional[float] = None
    score_sbert: Optional[float] = None

class BaseResponse(BaseModel):
    status: bool
    message: str
    timestamp: datetime
    data: Optional[dict] = None

class EssayResponse(BaseResponse):
    data: Optional[EssayData] = None

class EssayBatchResponse(BaseResponse):
    data: Optional[List[EssayData]] = None
