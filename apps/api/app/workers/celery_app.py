from celery import Celery
import os
import asyncio

redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "multiverse_worker",
    broker=redis_url,
    backend=redis_url
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

@celery_app.task
def generate_universe_task(resume_id: str, universe_id: str):
    # Synchronous wrapper around async task if needed, or use celery async
    # For now, just logging to simulate a background job
    print(f"Starting background generation for Resume {resume_id} in Universe {universe_id}")
    return {"status": "success", "resume_id": resume_id, "universe_id": universe_id}
