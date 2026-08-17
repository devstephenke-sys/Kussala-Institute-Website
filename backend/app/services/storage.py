import os
import uuid
import shutil
from typing import Tuple
from fastapi import UploadFile, HTTPException, status
from app.config import settings

ALLOWED_MIME_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf", ".doc", ".docx"}

class BaseStorageProvider:
    def upload_file(self, file: UploadFile) -> Tuple[str, str, int]:
        raise NotImplementedError

    def delete_file(self, file_path: str) -> bool:
        raise NotImplementedError

class LocalStorageProvider(BaseStorageProvider):
    def __init__(self, upload_dir: str = settings.UPLOAD_DIR):
        self.upload_dir = upload_dir
        os.makedirs(self.upload_dir, exist_ok=True)

    def validate_file(self, file: UploadFile):
        if file.content_type not in ALLOWED_MIME_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid file type: {file.content_type}. Allowed types: {', '.join(ALLOWED_MIME_TYPES)}"
            )

        ext = os.path.splitext(file.filename)[1].lower()
        if ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid file extension: {ext}. Allowed extensions: {', '.join(ALLOWED_EXTENSIONS)}"
            )

    def upload_file(self, file: UploadFile) -> Tuple[str, str, int]:
        self.validate_file(file)

        ext = os.path.splitext(file.filename)[1].lower()
        unique_filename = f"{uuid.uuid4().hex}{ext}"
        destination_path = os.path.join(self.upload_dir, unique_filename)

        file.file.seek(0, 2)
        file_size = file.file.tell()
        file.file.seek(0)

        if file_size > settings.MAX_FILE_SIZE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File size exceeds maximum limit of {settings.MAX_FILE_SIZE_BYTES / (1024*1024)}MB"
            )

        with open(destination_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        relative_url = f"/uploads/{unique_filename}"
        return destination_path, relative_url, file_size

    def delete_file(self, file_path: str) -> bool:
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
        return False

def get_storage_provider() -> BaseStorageProvider:
    # Provider abstraction: returns LocalStorageProvider by default
    return LocalStorageProvider()
