from fastapi import FastAPI
from app.api.middleware import log_requests
from app.api.routes import categories, questions
import logging

logging.basicConfig(level=logging.INFO)

app = FastAPI()
app.middleware("http")(log_requests)
app.include_router(categories.router, prefix="/api")
app.include_router(questions.router, prefix="/api")