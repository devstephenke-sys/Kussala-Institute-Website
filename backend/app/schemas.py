from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List, Generic, TypeVar
from datetime import datetime
from app.models import UserRole, ContentStatus

T = TypeVar("T")

# Pagination
class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    page_size: int
    total_pages: int

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserRead"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole = UserRole.CONTRIBUTOR
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None
    password: Optional[str] = None

class UserRead(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Category Schemas
class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    category_type: str = "general"

class CategoryCreate(CategoryBase):
    pass

class CategoryRead(CategoryBase):
    id: str

    model_config = ConfigDict(from_attributes=True)

# Article Schemas
class ArticleBase(BaseModel):
    title: str
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: str
    featured_image: Optional[str] = None
    category_id: Optional[str] = None
    tags: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class ArticleCreate(ArticleBase):
    status: ContentStatus = ContentStatus.DRAFT

class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    featured_image: Optional[str] = None
    category_id: Optional[str] = None
    tags: Optional[str] = None
    status: Optional[ContentStatus] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class ArticleRead(ArticleBase):
    id: str
    slug: str
    author_id: str
    author: Optional[UserRead] = None
    category: Optional[CategoryRead] = None
    status: ContentStatus
    created_at: datetime
    updated_at: datetime
    published_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

# News Schemas
class NewsBase(BaseModel):
    title: str
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: str
    featured_image: Optional[str] = None
    category: Optional[str] = "General"
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class NewsCreate(NewsBase):
    status: ContentStatus = ContentStatus.DRAFT

class NewsUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    featured_image: Optional[str] = None
    category: Optional[str] = None
    status: Optional[ContentStatus] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class NewsRead(NewsBase):
    id: str
    slug: str
    author_id: str
    author: Optional[UserRead] = None
    status: ContentStatus
    created_at: datetime
    updated_at: datetime
    published_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

# Impact Story Schemas
class ImpactStoryBase(BaseModel):
    title: str
    slug: Optional[str] = None
    summary: Optional[str] = None
    content: str
    featured_image: Optional[str] = None
    impact_category: Optional[str] = "Regional"
    beneficiary_info: Optional[str] = None
    location: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class ImpactStoryCreate(ImpactStoryBase):
    status: ContentStatus = ContentStatus.DRAFT

class ImpactStoryUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    featured_image: Optional[str] = None
    impact_category: Optional[str] = None
    beneficiary_info: Optional[str] = None
    location: Optional[str] = None
    status: Optional[ContentStatus] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class ImpactStoryRead(ImpactStoryBase):
    id: str
    slug: str
    author_id: str
    author: Optional[UserRead] = None
    status: ContentStatus
    created_at: datetime
    updated_at: datetime
    published_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

# Media Schemas
class MediaRead(BaseModel):
    id: str
    filename: str
    url: str
    mime_type: str
    file_size: int
    uploaded_by_id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Audit Log Schemas
class AuditLogRead(BaseModel):
    id: str
    user_id: Optional[str] = None
    user_name: Optional[str] = None
    action: str
    resource_type: str
    resource_id: Optional[str] = None
    details: Optional[str] = None
    ip_address: Optional[str] = None
    timestamp: datetime

    model_config = ConfigDict(from_attributes=True)
