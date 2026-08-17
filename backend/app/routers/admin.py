from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Request, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional, List
from datetime import datetime
import math
import re

from app.database import get_db
from app.models import User, UserRole, Article, News, ImpactStory, Category, ContentStatus, Media, AuditLog
from app.schemas import (
    ArticleCreate, ArticleUpdate, ArticleRead,
    NewsCreate, NewsUpdate, NewsRead,
    ImpactStoryCreate, ImpactStoryUpdate, ImpactStoryRead,
    UserCreate, UserUpdate, UserRead,
    MediaRead, AuditLogRead, PaginatedResponse
)
from app.auth import get_current_active_user, require_roles, get_password_hash
from app.services.storage import get_storage_provider

router = APIRouter(prefix="/admin", tags=["Admin Portal & CMS"])

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text

def log_action(db: Session, user: User, action: str, resource_type: str, resource_id: str, details: str = None, req: Request = None):
    ip = req.client.host if req and req.client else None
    audit = AuditLog(
        user_id=user.id,
        user_name=user.full_name,
        action=action,
        resource_type=resource_type,
        resource_id=resource_id,
        details=details,
        ip_address=ip
    )
    db.add(audit)
    db.commit()

# --- DASHBOARD STATS ---
@router.get("/dashboard/stats")
def get_dashboard_stats(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    total_articles = db.query(Article).count()
    draft_articles = db.query(Article).filter(Article.status == ContentStatus.DRAFT).count()
    pending_articles = db.query(Article).filter(Article.status.in_([ContentStatus.SUBMITTED, ContentStatus.IN_REVIEW])).count()
    published_articles = db.query(Article).filter(Article.status == ContentStatus.PUBLISHED).count()

    total_news = db.query(News).count()
    published_news = db.query(News).filter(News.status == ContentStatus.PUBLISHED).count()

    total_impact = db.query(ImpactStory).count()
    published_impact = db.query(ImpactStory).filter(ImpactStory.status == ContentStatus.PUBLISHED).count()

    recent_logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(10).all()

    return {
        "content_stats": {
            "articles": {"total": total_articles, "draft": draft_articles, "pending_review": pending_articles, "published": published_articles},
            "news": {"total": total_news, "published": published_news},
            "impact": {"total": total_impact, "published": published_impact},
        },
        "recent_activity": [AuditLogRead.model_validate(log) for log in recent_logs]
    }

# --- ARTICLES CMS ---
@router.get("/articles", response_model=PaginatedResponse[ArticleRead])
def get_admin_articles(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    query = db.query(Article)

    if current_user.role == UserRole.CONTRIBUTOR:
        query = query.filter(Article.author_id == current_user.id)

    if status and status.strip():
        try:
            enum_status = ContentStatus(status.strip())
            query = query.filter(Article.status == enum_status)
        except ValueError:
            pass

    if search:
        search_pattern = f"%{search}%"
        query = query.filter(or_(Article.title.ilike(search_pattern), Article.content.ilike(search_pattern)))

    total = query.count()
    total_pages = math.ceil(total / page_size) if total > 0 else 1
    items = query.order_by(Article.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()

    return PaginatedResponse(
        items=[ArticleRead.model_validate(i) for i in items],
        total=total, page=page, page_size=page_size, total_pages=total_pages
    )

@router.post("/articles", response_model=ArticleRead, status_code=201)
def create_article(
    payload: ArticleCreate,
    req: Request,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Server-side RBAC check: Contributors can ONLY create DRAFT or SUBMITTED status
    if current_user.role == UserRole.CONTRIBUTOR and payload.status in [ContentStatus.APPROVED, ContentStatus.PUBLISHED]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Contributors are not permitted to approve or publish content directly."
        )

    base_slug = payload.slug or slugify(payload.title)
    slug = base_slug
    counter = 1
    while db.query(Article).filter(Article.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    published_at = datetime.utcnow() if payload.status == ContentStatus.PUBLISHED else None

    article = Article(
        title=payload.title,
        slug=slug,
        excerpt=payload.excerpt,
        content=payload.content,
        featured_image=payload.featured_image,
        author_id=current_user.id,
        category_id=payload.category_id,
        tags=payload.tags,
        status=payload.status,
        published_at=published_at,
        seo_title=payload.seo_title or payload.title,
        seo_description=payload.seo_description or payload.excerpt
    )
    db.add(article)
    db.commit()
    db.refresh(article)

    log_action(db, current_user, f"CREATE_{payload.status.value.upper()}", "Article", article.id, f"Created article '{article.title}'", req)
    return ArticleRead.model_validate(article)

@router.put("/articles/{article_id}", response_model=ArticleRead)
def update_article(
    article_id: str,
    payload: ArticleUpdate,
    req: Request,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    # Author or Editor+ check
    if current_user.role == UserRole.CONTRIBUTOR and article.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Cannot edit articles created by other users.")

    if current_user.role == UserRole.CONTRIBUTOR and payload.status in [ContentStatus.APPROVED, ContentStatus.PUBLISHED]:
        raise HTTPException(status_code=403, detail="Contributors cannot publish content directly.")

    for field, val in payload.model_dump(exclude_unset=True).items():
        if field == "slug" and val:
            val = slugify(val)
        setattr(article, field, val)

    if payload.status == ContentStatus.PUBLISHED and not article.published_at:
        article.published_at = datetime.utcnow()

    article.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(article)

    log_action(db, current_user, "UPDATE", "Article", article.id, f"Updated article '{article.title}'", req)
    return ArticleRead.model_validate(article)

@router.delete("/articles/{article_id}")
def delete_article(
    article_id: str,
    req: Request,
    current_user: User = Depends(require_roles([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR])),
    db: Session = Depends(get_db)
):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    db.delete(article)
    db.commit()
    log_action(db, current_user, "DELETE", "Article", article_id, f"Deleted article '{article.title}'", req)
    return {"message": "Article deleted successfully"}

# --- NEWS CMS ---
@router.get("/news", response_model=PaginatedResponse[NewsRead])
def get_admin_news(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    status: Optional[str] = Query(None),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    query = db.query(News)
    if status and status.strip():
        try:
            enum_status = ContentStatus(status.strip())
            query = query.filter(News.status == enum_status)
        except ValueError:
            pass
    total = query.count()
    items = query.order_by(News.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
    return PaginatedResponse(
        items=[NewsRead.model_validate(i) for i in items],
        total=total, page=page, page_size=page_size, total_pages=math.ceil(total / page_size) if total > 0 else 1
    )

@router.post("/news", response_model=NewsRead, status_code=201)
def create_news(
    payload: NewsCreate,
    req: Request,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if current_user.role == UserRole.CONTRIBUTOR and payload.status in [ContentStatus.APPROVED, ContentStatus.PUBLISHED]:
        raise HTTPException(status_code=403, detail="Contributors cannot publish content directly.")

    base_slug = payload.slug or slugify(payload.title)
    slug = base_slug
    counter = 1
    while db.query(News).filter(News.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    news_item = News(
        title=payload.title,
        slug=slug,
        excerpt=payload.excerpt,
        content=payload.content,
        featured_image=payload.featured_image,
        author_id=current_user.id,
        category=payload.category,
        status=payload.status,
        published_at=datetime.utcnow() if payload.status == ContentStatus.PUBLISHED else None,
        seo_title=payload.seo_title or payload.title,
        seo_description=payload.seo_description or payload.excerpt
    )
    db.add(news_item)
    db.commit()
    db.refresh(news_item)
    log_action(db, current_user, "CREATE", "News", news_item.id, f"Created news item '{news_item.title}'", req)
    return NewsRead.model_validate(news_item)

@router.put("/news/{news_id}", response_model=NewsRead)
def update_news(
    news_id: str,
    payload: NewsUpdate,
    req: Request,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    news_item = db.query(News).filter(News.id == news_id).first()
    if not news_item:
        raise HTTPException(status_code=404, detail="News item not found")

    if current_user.role == UserRole.CONTRIBUTOR and payload.status in [ContentStatus.APPROVED, ContentStatus.PUBLISHED]:
        raise HTTPException(status_code=403, detail="Contributors cannot publish content directly.")

    for field, val in payload.model_dump(exclude_unset=True).items():
        setattr(news_item, field, val)

    if payload.status == ContentStatus.PUBLISHED and not news_item.published_at:
        news_item.published_at = datetime.utcnow()

    db.commit()
    db.refresh(news_item)
    log_action(db, current_user, "UPDATE", "News", news_item.id, f"Updated news '{news_item.title}'", req)
    return NewsRead.model_validate(news_item)

@router.delete("/news/{news_id}")
def delete_news(
    news_id: str,
    req: Request,
    current_user: User = Depends(require_roles([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR])),
    db: Session = Depends(get_db)
):
    news_item = db.query(News).filter(News.id == news_id).first()
    if not news_item:
        raise HTTPException(status_code=404, detail="News item not found")
    db.delete(news_item)
    db.commit()
    log_action(db, current_user, "DELETE", "News", news_id, f"Deleted news '{news_item.title}'", req)
    return {"message": "News item deleted successfully"}

# --- IMPACT STORIES CMS ---
@router.get("/impact", response_model=PaginatedResponse[ImpactStoryRead])
def get_admin_impact(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    status: Optional[str] = Query(None),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    query = db.query(ImpactStory)
    if status and status.strip():
        try:
            enum_status = ContentStatus(status.strip())
            query = query.filter(ImpactStory.status == enum_status)
        except ValueError:
            pass
    total = query.count()
    items = query.order_by(ImpactStory.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
    return PaginatedResponse(
        items=[ImpactStoryRead.model_validate(i) for i in items],
        total=total, page=page, page_size=page_size, total_pages=math.ceil(total / page_size) if total > 0 else 1
    )

@router.post("/impact", response_model=ImpactStoryRead, status_code=201)
def create_impact_story(
    payload: ImpactStoryCreate,
    req: Request,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if current_user.role == UserRole.CONTRIBUTOR and payload.status in [ContentStatus.APPROVED, ContentStatus.PUBLISHED]:
        raise HTTPException(status_code=403, detail="Contributors cannot publish content directly.")

    base_slug = payload.slug or slugify(payload.title)
    slug = base_slug
    counter = 1
    while db.query(ImpactStory).filter(ImpactStory.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    story = ImpactStory(
        title=payload.title,
        slug=slug,
        summary=payload.summary,
        content=payload.content,
        featured_image=payload.featured_image,
        author_id=current_user.id,
        impact_category=payload.impact_category,
        beneficiary_info=payload.beneficiary_info,
        location=payload.location,
        status=payload.status,
        published_at=datetime.utcnow() if payload.status == ContentStatus.PUBLISHED else None,
        seo_title=payload.seo_title or payload.title,
        seo_description=payload.seo_description or payload.summary
    )
    db.add(story)
    db.commit()
    db.refresh(story)
    log_action(db, current_user, "CREATE", "ImpactStory", story.id, f"Created impact story '{story.title}'", req)
    return ImpactStoryRead.model_validate(story)

@router.put("/impact/{story_id}", response_model=ImpactStoryRead)
def update_impact_story(
    story_id: str,
    payload: ImpactStoryUpdate,
    req: Request,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    story = db.query(ImpactStory).filter(ImpactStory.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Impact story not found")
    if current_user.role == UserRole.CONTRIBUTOR and payload.status in [ContentStatus.APPROVED, ContentStatus.PUBLISHED]:
        raise HTTPException(status_code=403, detail="Contributors cannot publish content directly.")
    for field, val in payload.model_dump(exclude_unset=True).items():
        setattr(story, field, val)
    if payload.status == ContentStatus.PUBLISHED and not story.published_at:
        story.published_at = datetime.utcnow()
    db.commit()
    db.refresh(story)
    log_action(db, current_user, "UPDATE", "ImpactStory", story.id, f"Updated impact story '{story.title}'", req)
    return ImpactStoryRead.model_validate(story)

@router.delete("/impact/{story_id}")
def delete_impact_story(
    story_id: str,
    req: Request,
    current_user: User = Depends(require_roles([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR])),
    db: Session = Depends(get_db)
):
    story = db.query(ImpactStory).filter(ImpactStory.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Impact story not found")
    db.delete(story)
    db.commit()
    log_action(db, current_user, "DELETE", "ImpactStory", story_id, f"Deleted impact story '{story.title}'", req)
    return {"message": "Impact story deleted successfully"}

# --- MEDIA MANAGER ---
@router.post("/media/upload", response_model=MediaRead)
def upload_media(
    file: UploadFile = File(...),
    req: Request = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    storage = get_storage_provider()
    file_path, file_url, file_size = storage.upload_file(file)

    media_entry = Media(
        filename=file.filename,
        file_path=file_path,
        url=file_url,
        mime_type=file.content_type,
        file_size=file_size,
        uploaded_by_id=current_user.id
    )
    db.add(media_entry)
    db.commit()
    db.refresh(media_entry)

    log_action(db, current_user, "UPLOAD", "Media", media_entry.id, f"Uploaded media file '{file.filename}'", req)
    return MediaRead.model_validate(media_entry)

@router.get("/media", response_model=List[MediaRead])
def list_media(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    media_files = db.query(Media).order_by(Media.created_at.desc()).limit(100).all()
    return [MediaRead.model_validate(m) for m in media_files]

# --- USER & ROLE MANAGEMENT ---
@router.get("/users", response_model=List[UserRead])
def list_users(
    current_user: User = Depends(require_roles([UserRole.SUPER_ADMIN, UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    users = db.query(User).all()
    return [UserRead.model_validate(u) for u in users]

@router.post("/users", response_model=UserRead, status_code=201)
def create_user(
    payload: UserCreate,
    req: Request,
    current_user: User = Depends(require_roles([UserRole.SUPER_ADMIN, UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=400, detail="User with this email already exists")

    user = User(
        email=payload.email,
        password_hash=get_password_hash(payload.password),
        full_name=payload.full_name,
        role=payload.role,
        is_active=payload.is_active
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    log_action(db, current_user, "CREATE", "User", user.id, f"Created user {user.email} with role {user.role.value}", req)
    return UserRead.model_validate(user)

# --- AUDIT LOGS ---
@router.get("/audit-logs", response_model=List[AuditLogRead])
def get_audit_logs(
    current_user: User = Depends(require_roles([UserRole.SUPER_ADMIN, UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(200).all()
    return [AuditLogRead.model_validate(log) for log in logs]
