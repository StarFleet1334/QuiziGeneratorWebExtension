from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_KEY: str = "AIzaSyDiWFHBDzyG5WKtMkTbHsS7Bcl5OugBbQM"
    MODEL_NAME: str = "gemini-2.0-flash"
    MAX_CHUNK_LENGTH: int = 200

settings = Settings()