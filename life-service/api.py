from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

# TO run use -> uvicorn api:app --reload --port 8000

app = FastAPI()
question_generator = pipeline("text2text-generation", model="google/flan-t5-base")

class TextRequest(BaseModel):
    text: str

@app.post("/generate-questions")
def generate_questions(req: TextRequest):
    prompt = f"Generate 5 questions: {req.text}"
    result = question_generator(prompt, max_length=256, do_sample=True)
    questions = result[0]['generated_text'].split("?")
    questions = [q.strip() + "?" for q in questions if q.strip()]
    return {"questions": questions}
