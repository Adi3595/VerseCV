from fastapi import APIRouter
from .endpoints import resume, export

api_router = APIRouter()
api_router.include_router(resume.router, prefix="/resume", tags=["resume"])
api_router.include_router(export.router, prefix="/export", tags=["export"])
