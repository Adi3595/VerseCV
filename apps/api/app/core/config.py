from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str
    VERSION: str
    API_V1_STR: str
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str]
    
    # Security
    JWT_SECRET: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int
    
    # Database
    DATABASE_URL: str
    
    # AI Config
    AI_PROVIDER: str
    OPENROUTER_API_KEY: str | None = None
    OPENROUTER_TEXT_MODEL: str
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True, extra="ignore")

settings = Settings()
