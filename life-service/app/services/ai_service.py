from google import genai
from app.config.settings import settings

class AIService:
    def __init__(self):
        self.client = genai.Client(api_key=settings.API_KEY)

    async def generate_content(self, prompt: str) -> str:
        response = self.client.models.generate_content(
            model=settings.MODEL_NAME,
            contents=prompt
        )
        return response.text

ai_service = AIService()