from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_KEY: str = "<API_KEY>"
    MODEL_NAME: str = "gemini-2.0-flash"
    MAX_CHUNK_LENGTH: int = 200

settings = Settings()