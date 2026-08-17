import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Kussala Institute Digital Platform API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Security / Auth
    JWT_SECRET: str = os.getenv("JWT_SECRET", "kussala_institute_super_secret_jwt_key_2026_change_in_prod")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./kussala.db")
    
    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "https://kussalainstitute.org",
        "https://admin.kussalainstitute.org",
        "https://lms.kussalainstitute.org",
    ]
    
    # Media Storage
    MEDIA_STORAGE_PROVIDER: str = os.getenv("MEDIA_STORAGE_PROVIDER", "local")  # local, s3, cloudinary
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "uploads")
    MAX_FILE_SIZE_BYTES: int = 10 * 1024 * 1024  # 10 MB
    
    # Moodle Integration
    MOODLE_BASE_URL: str = os.getenv("MOODLE_BASE_URL", "https://lms.kussalainstitute.org")
    MOODLE_API_TOKEN: str = os.getenv("MOODLE_API_TOKEN", "")

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()

