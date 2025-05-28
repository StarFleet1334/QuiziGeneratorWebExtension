import logging

from fastapi import APIRouter

from app.models.request_models import TextRequest
from app.services.ai_service import ai_service
from app.services.text_service import TextService

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/generate-categories")
async def generate_categories(req: TextRequest):
    logger.info("generate_categories endpoint called")
    logger.info(f"Received text length: {len(req.text) if req.text else 0}")

    if not req.text.strip():
        logger.warning("Empty text received")
        return {}

    try:
        chunks = TextService.split_into_chunks(req.text)
        category_matches = {}

        for chunk in chunks:
            formatted_prompt = TextService.get_category_prompt(chunk,req.language)
            result = await ai_service.generate_content(formatted_prompt)
            categories = TextService.parse_categories(result)

            for category in categories:
                if category not in category_matches:
                    category_matches[category] = []
                category_matches[category].append(chunk)

        return category_matches

    except Exception as e:
        logger.warning(f"Error generating categories: {str(e)}")
        return {}
