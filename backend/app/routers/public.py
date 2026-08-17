from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional, List
import math

from app.database import get_db
from app.models import Article, News, ImpactStory, Category, ContentStatus
from app.schemas import ArticleRead, NewsRead, ImpactStoryRead, CategoryRead, PaginatedResponse

router = APIRouter(prefix="", tags=["Public Content"])

@router.get("/articles", response_model=PaginatedResponse[ArticleRead])
def get_public_articles(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    search: Optional[str] = None,
    category_slug: Optional[str] = None,
    tag: Optional[str] = None,
    db: Session = Depends(get_db)
):
    # STRICT FILTER: status == PUBLISHED ONLY
    query = db.query(Article).filter(Article.status == ContentStatus.PUBLISHED)

    if category_slug:
        cat = db.query(Category).filter(Category.slug == category_slug).first()
        if cat:
            query = query.filter(Article.category_id == cat.id)

    if tag:
        query = query.filter(Article.tags.ilike(f"%{tag}%"))

    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                Article.title.ilike(search_pattern),
                Article.excerpt.ilike(search_pattern),
                Article.content.ilike(search_pattern)
            )
        )

    total = query.count()
    total_pages = math.ceil(total / page_size) if total > 0 else 1
    items = query.order_by(Article.published_at.desc()).offset((page - 1) * page_size).limit(page_size).all()

    return PaginatedResponse(
        items=[ArticleRead.model_validate(item) for item in items],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )

@router.get("/articles/{slug}", response_model=ArticleRead)
def get_public_article_by_slug(slug: str, db: Session = Depends(get_db)):
    article = db.query(Article).filter(
        Article.slug == slug,
        Article.status == ContentStatus.PUBLISHED
    ).first()

    if not article:
        raise HTTPException(status_code=404, detail="Article not found or not published")
    return ArticleRead.model_validate(article)

@router.get("/news", response_model=PaginatedResponse[NewsRead])
def get_public_news(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    search: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(News).filter(News.status == ContentStatus.PUBLISHED)

    if category:
        query = query.filter(News.category.ilike(f"%{category}%"))

    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                News.title.ilike(search_pattern),
                News.excerpt.ilike(search_pattern),
                News.content.ilike(search_pattern)
            )
        )

    total = query.count()
    total_pages = math.ceil(total / page_size) if total > 0 else 1
    items = query.order_by(News.published_at.desc()).offset((page - 1) * page_size).limit(page_size).all()

    return PaginatedResponse(
        items=[NewsRead.model_validate(item) for item in items],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )

@router.get("/news/{slug}", response_model=NewsRead)
def get_public_news_by_slug(slug: str, db: Session = Depends(get_db)):
    news_item = db.query(News).filter(
        News.slug == slug,
        News.status == ContentStatus.PUBLISHED
    ).first()

    if not news_item:
        raise HTTPException(status_code=404, detail="News item not found or not published")
    return NewsRead.model_validate(news_item)

@router.get("/impact", response_model=PaginatedResponse[ImpactStoryRead])
def get_public_impact_stories(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    search: Optional[str] = None,
    impact_category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(ImpactStory).filter(ImpactStory.status == ContentStatus.PUBLISHED)

    if impact_category:
        query = query.filter(ImpactStory.impact_category.ilike(f"%{impact_category}%"))

    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                ImpactStory.title.ilike(search_pattern),
                ImpactStory.summary.ilike(search_pattern),
                ImpactStory.content.ilike(search_pattern)
            )
        )

    total = query.count()
    total_pages = math.ceil(total / page_size) if total > 0 else 1
    items = query.order_by(ImpactStory.published_at.desc()).offset((page - 1) * page_size).limit(page_size).all()

    return PaginatedResponse(
        items=[ImpactStoryRead.model_validate(item) for item in items],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )

@router.get("/impact/{slug}", response_model=ImpactStoryRead)
def get_public_impact_by_slug(slug: str, db: Session = Depends(get_db)):
    story = db.query(ImpactStory).filter(
        ImpactStory.slug == slug,
        ImpactStory.status == ContentStatus.PUBLISHED
    ).first()

    if not story:
        raise HTTPException(status_code=404, detail="Impact story not found or not published")
    return ImpactStoryRead.model_validate(story)

@router.get("/categories", response_model=List[CategoryRead])
def get_public_categories(db: Session = Depends(get_db)):
    cats = db.query(Category).all()
    return [CategoryRead.model_validate(c) for c in cats]
