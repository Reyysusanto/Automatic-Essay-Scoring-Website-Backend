from pydantic import BaseModel

class EssayRequest(BaseModel):
    soal: str
    jawaban: str
    kunci_jawaban: str
