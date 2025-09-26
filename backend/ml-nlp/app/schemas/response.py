from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class BaseResponse(BaseModel):
    status: bool
    message: str
    timestamp: datetime
    data: Optional[dict] = None


class EssayData(BaseModel):
    score_tfidf: Optional[float] = None
    score_indobert: Optional[float] = None

class EssayResponse(BaseResponse):
    data: Optional[EssayData] = None
