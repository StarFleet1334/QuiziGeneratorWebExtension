from fastapi import APIRouter
from app.models.request_models import TextRequest
from app.services.ai_service import ai_service
from app.services.text_service import TextService
import logging
from random import choice

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/generate-questions")
async def generate_questions(req: TextRequest):
    logger.info("generate_questions endpoint called")

    if not req.text.strip():
        return {"questions": [], "error": "Input text is empty"}

    try:
        chunks = TextService.split_into_chunks(req.text)
        logger.info(f"Created {len(chunks)} chunks")

        if not chunks:
            return {"questions": [], "error": "No valid chunks created"}

        random_chunk = choice(chunks)
        logger.debug(f"Selected chunk: {random_chunk}")

        prompt = TextService.get_question_prompt(
            random_chunk,
            req.trueFalseQuestions,
        )

        logger.debug(f"Generated prompt: {prompt}")
        logger.info("Sending prompt to AI service")

        result = await ai_service.generate_content(prompt)
        logger.info(f"AI service response: {result}")

        parsed = TextService.parse_question(result)
        logger.info(f"Parsed question: {parsed}")

        return {"questions": [parsed] if parsed else [], "error": None}

    except Exception as e:
        logger.error(f"Error generating questions: {str(e)}")
        return {"questions": [], "error": str(e)}