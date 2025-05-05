from fastapi import Request
import logging

logger = logging.getLogger(__name__)

async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    try:
        body = await request.body()
        logger.info(f"Request body: {body.decode()}")
    except Exception as e:
        logger.error(f"Error reading body: {e}")
    response = await call_next(request)
    return response