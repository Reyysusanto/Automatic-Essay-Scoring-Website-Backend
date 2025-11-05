from typing import List
from pydantic import BaseModel

class EssayRequest(BaseModel):
    soal: str
    jawaban: str
    kunci_jawaban: str

class EssayBatchRequest(BaseModel):
    user_id: str
    answers: List[EssayRequest]
