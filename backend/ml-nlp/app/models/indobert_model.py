from transformers import AutoTokenizer, AutoModelForSequenceClassification
from app.core.config import MODEL_NAME

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
model.eval()
