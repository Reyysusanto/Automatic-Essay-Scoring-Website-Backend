from transformers import AutoModel, AutoTokenizer
from app.core.config import MODEL_NAME

# Load IndoBERT 
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModel.from_pretrained(MODEL_NAME)
model.eval()
