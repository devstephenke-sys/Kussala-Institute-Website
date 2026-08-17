import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app
from app.database import Base, get_db
from app.models import User, UserRole, Article, ContentStatus
from app.auth import get_password_hash

# Use in-memory SQLite for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    
    # Create test users
    admin = User(
        email="admin_test@kussala.org",
        password_hash=get_password_hash("password123"),
        full_name="Test Admin",
        role=UserRole.SUPER_ADMIN,
        is_active=True
    )
    contrib = User(
        email="contrib_test@kussala.org",
        password_hash=get_password_hash("password123"),
        full_name="Test Contributor",
        role=UserRole.CONTRIBUTOR,
        is_active=True
    )
    db.add_all([admin, contrib])
    db.commit()

    # Create published and draft articles
    published_art = Article(
        title="Published Article",
        slug="published-article",
        content="Public content",
        author_id=admin.id,
        status=ContentStatus.PUBLISHED
    )
    draft_art = Article(
        title="Draft Article",
        slug="draft-article",
        content="Secret draft content",
        author_id=contrib.id,
        status=ContentStatus.DRAFT
    )
    db.add_all([published_art, draft_art])
    db.commit()

    yield

    Base.metadata.drop_all(bind=engine)

def get_token(email: str, password: str = "password123"):
    response = client.post("/api/v1/auth/login/json", json={"email": email, "password": password})
    assert response.status_code == 200
    return response.json()["access_token"]

def test_public_articles_endpoint_returns_only_published():
    response = client.get("/api/v1/articles")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    assert data["items"][0]["slug"] == "published-article"
    
    # Verify draft is 404 on public slug endpoint
    draft_resp = client.get("/api/v1/articles/draft-article")
    assert draft_resp.status_code == 404

def test_contributor_cannot_publish_directly():
    contrib_token = get_token("contrib_test@kussala.org")
    headers = {"Authorization": f"Bearer {contrib_token}"}
    
    # Attempt to create article with status = PUBLISHED
    payload = {
        "title": "Unauthorized Publication",
        "content": "Trying to publish directly",
        "status": "published"
    }
    response = client.post("/api/v1/admin/articles", json=payload, headers=headers)
    assert response.status_code == 403
    assert "Contributors are not permitted" in response.json()["detail"]

def test_contributor_can_create_draft():
    contrib_token = get_token("contrib_test@kussala.org")
    headers = {"Authorization": f"Bearer {contrib_token}"}
    
    payload = {
        "title": "My New Research Draft",
        "content": "Valid draft content",
        "status": "draft"
    }
    response = client.post("/api/v1/admin/articles", json=payload, headers=headers)
    assert response.status_code == 201
    assert response.json()["status"] == "draft"

def test_invalid_file_upload_rejected():
    admin_token = get_token("admin_test@kussala.org")
    headers = {"Authorization": f"Bearer {admin_token}"}

    files = {"file": ("malicious.exe", b"executable code content", "application/x-msdownload")}
    response = client.post("/api/v1/admin/media/upload", files=files, headers=headers)
    assert response.status_code == 400
    assert "Invalid file type" in response.json()["detail"]
