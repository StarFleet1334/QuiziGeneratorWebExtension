from random import choice
from fastapi import FastAPI, Request
from pydantic import BaseModel
from google import genai
import re
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# to run -> uvicorn api:app --reload --port 8001
app = FastAPI()


API_KEY = "<Your GEMINI API KEY>"
client = genai.Client(api_key=API_KEY)

class TextRequest(BaseModel):
    text: str


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    try:
        body = await request.body()
        logger.info(f"Request body: {body.decode()}")
    except Exception as e:
        logger.error(f"Error reading body: {e}")
    response = await call_next(request)
    return response
@app.get("/test")
async def test():
    logger.info("Test endpoint called")
    return {"status": "ok"}


@app.post("/generate-questions")
async def generate_questions(req: TextRequest):
    logger.info("generate_questions endpoint called")
    logger.info(f"Received text length: {len(req.text) if req.text else 0}")

    if not req.text.strip():
        logger.warning("Empty text received")
        return {"questions": [], "error": "Input text is empty"}

    try:
        chunks = split_into_chunks(req.text, max_length=200)
        if not chunks:
            logger.warning("No valid chunks created")
            return {"questions": [], "error": "No valid chunks created"}

        random_chunk = choice(chunks)
        logger.info(f"Selected chunk: {random_chunk[:100]}...")

        prompt = (
            "Using ONLY the information from the given text, create one multiple-choice question. "
            "The question must be directly answerable from the text. "
            "One option must be the correct answer that appears in the text. "
            "Other options must be clearly wrong but plausible. "
            "Format your response exactly like this:\n\n"
            "Question: [Write a clear question]\n"
            "A) [First option - use exact text if it's the correct answer]\n"
            "B) [Second option]\n"
            "C) [Third option]\n"
            "D) [Fourth option]\n"
            "Correct: [Write A, B, C, or D - must correspond to the option that matches the text exactly]\n\n"
            "Text to use:\n"
            f"{random_chunk}\n\n"
            "Important: The correct answer MUST be a fact stated in the text. Do not make up or infer answers."
        )

        logger.info("Sending request to Gemini...")

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )
        logger.info("Successfully received response from Gemini")
        logger.info("Received response from Gemini")

        result = response.text
        logger.info(f"Generated raw text: {result}")

        parsed = robust_parse_question(result)
        logger.info(f"Parsed question: {parsed}")

        return {"questions": [parsed] if parsed else []}

    except Exception as e:
        error_msg = f"Error generating question: {str(e)}"
        logger.warning(error_msg)
        return {"questions": [], "error": error_msg}



def split_into_chunks(text, max_length=350):
    sentences = text.split('.')
    chunks, current_chunk, current_length = [], [], 0

    for sentence in sentences:
        sentence = sentence.strip() + '.'
        sentence_length = len(sentence.split())
        if current_length + sentence_length > max_length:
            chunks.append(' '.join(current_chunk))
            current_chunk, current_length = [sentence], sentence_length
        else:
            current_chunk.append(sentence)
            current_length += sentence_length

    if current_chunk:
        chunks.append(' '.join(current_chunk))

    return chunks

def robust_parse_question(text):
    question = None
    choices = {}
    correct_answer = None

    lines = text.strip().split('\n')
    for line in lines:
        line = line.strip()

        if line.lower().startswith('question:'):
            question = line[9:].strip()

        elif re.match(r'^[A-D][\)\.]\s', line):
            label = line[0]
            content = line[2:].strip()
            choices[label] = content

        elif line.lower().startswith('correct:'):
            correct_answer = line[8:].strip().upper()
            if correct_answer and len(correct_answer) == 1:
                correct_answer = correct_answer[0]

    if (question and
            len(choices) == 4 and
            correct_answer and
            correct_answer in ['A', 'B', 'C', 'D'] and
            all(k in choices for k in ['A', 'B', 'C', 'D'])):

        return {
            "question": question,
            "choices": choices,
            "correct_answer": correct_answer
        }
    return None
