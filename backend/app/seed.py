import sys
import os
from datetime import datetime

from app.database import SessionLocal, engine, Base
from app.models import User, UserRole, Category, Article, News, ImpactStory, ContentStatus
from app.auth import get_password_hash

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Create Default Users
        admin_user = db.query(User).filter(User.email == "admin@kussalainstitute.org").first()
        if not admin_user:
            admin_user = User(
                email="admin@kussalainstitute.org",
                password_hash=get_password_hash("KussalaAdmin2026!"),
                full_name="Kussala Super Administrator",
                role=UserRole.SUPER_ADMIN,
                is_active=True
            )
            db.add(admin_user)
            print("--> Seeded Super Admin: admin@kussalainstitute.org")

        editor_user = db.query(User).filter(User.email == "editor@kussalainstitute.org").first()
        if not editor_user:
            editor_user = User(
                email="editor@kussalainstitute.org",
                password_hash=get_password_hash("KussalaEditor2026!"),
                full_name="Senior Content Editor",
                role=UserRole.EDITOR,
                is_active=True
            )
            db.add(editor_user)
            print("--> Seeded Editor: editor@kussalainstitute.org")

        contrib_user = db.query(User).filter(User.email == "contributor@kussalainstitute.org").first()
        if not contrib_user:
            contrib_user = User(
                email="contributor@kussalainstitute.org",
                password_hash=get_password_hash("KussalaContributor2026!"),
                full_name="Research Contributor",
                role=UserRole.CONTRIBUTOR,
                is_active=True
            )
            db.add(contrib_user)
            print("--> Seeded Contributor: contributor@kussalainstitute.org")

        db.commit()
        db.refresh(admin_user)

        # 2. Create Categories
        categories_data = [
            {"name": "Ethical Leadership", "slug": "ethical-leadership", "description": "Programs and research on moral public governance and ethical civil service leadership."},
            {"name": "Peacebuilding & Conflict Transformation", "slug": "peacebuilding", "description": "Grassroots mediation, cross-border dialogue, and community reconciliation initiatives."},
            {"name": "Youth & Women Empowerment", "slug": "empowerment", "description": "Capacity building for emerging youth leaders and women in decision-making roles."},
        ]

        cat_map = {}
        for cat_info in categories_data:
            existing = db.query(Category).filter(Category.slug == cat_info["slug"]).first()
            if not existing:
                existing = Category(name=cat_info["name"], slug=cat_info["slug"], description=cat_info["description"])
                db.add(existing)
                db.commit()
                db.refresh(existing)
            cat_map[cat_info["slug"]] = existing.id

        # 3. Create Sample Articles
        if db.query(Article).count() == 0:
            sample_articles = [
                {
                    "title": "Nurturing Ethical Leadership in Post-Conflict Civil Service",
                    "slug": "nurturing-ethical-leadership-civil-service",
                    "excerpt": "How systemic integrity and ethical public financial management form the bedrock of institutional stability in South Sudan and Eastern DRC.",
                    "content": "Institutional resilience depends on public servants who possess both administrative competence and unshakeable moral integrity. Kussala Institute's Ethical Leadership Academy provides civil servants with practical toolkits for public financial accountability, anti-corruption safeguards, and conflict-sensitive policy design...",
                    "featured_image": "/gallery/bishop-leaders-group.jpeg",
                    "author_id": admin_user.id,
                    "category_id": cat_map.get("ethical-leadership"),
                    "tags": "Leadership, Governance, South Sudan, Peacebuilding",
                    "status": ContentStatus.PUBLISHED,
                    "published_at": datetime.utcnow()
                },
                {
                    "title": "Grassroots Mediation: The Power of Community Dialogue in North Kivu",
                    "slug": "grassroots-mediation-community-dialogue-north-kivu",
                    "excerpt": "A deep dive into KUI's cross-border mediation frameworks supporting local peace committees across fragile border zones.",
                    "content": "Sustainable peace cannot be imposed from above; it must be cultivated through trusted community dialogue mechanisms. In Eastern DRC, KUI works directly with traditional leaders, youth networks, and faith-based actors to address root causes of natural resource conflicts...",
                    "featured_image": "/gallery/peace-conference-nairobi.jpg",
                    "author_id": admin_user.id,
                    "category_id": cat_map.get("peacebuilding"),
                    "tags": "DRC, Mediation, Peacebuilding, Youth",
                    "status": ContentStatus.PUBLISHED,
                    "published_at": datetime.utcnow()
                }
            ]
            for a in sample_articles:
                db.add(Article(**a))
            db.commit()
            print("--> Seeded initial published Articles.")

        # 4. Create Sample News
        if db.query(News).count() == 0:
            sample_news = [
                {
                    "title": "Kussala Institute Launches Inaugural Regional Peace Summit 2026",
                    "slug": "kui-launches-regional-peace-summit-2026",
                    "excerpt": "Delegates from across East and Central Africa gather in Nairobi for high-level leadership diplomacy discussions.",
                    "content": "Kussala Institute for Strategic Leadership and Peacebuilding (KUI) officially convened its inaugural Regional Peace Summit. The summit brought together state authorities, civil society representatives, and academic scholars to strategize on transboundary peace architecture...",
                    "featured_image": "/gallery/africa-women-summit.jpg",
                    "author_id": admin_user.id,
                    "category": "Announcement",
                    "status": ContentStatus.PUBLISHED,
                    "published_at": datetime.utcnow()
                }
            ]
            for n in sample_news:
                db.add(News(**n))
            db.commit()
            print("--> Seeded initial published News.")

        # 5. Create Sample Impact Stories
        if db.query(ImpactStory).count() == 0:
            sample_impact = [
                {
                    "title": "Empowering 100+ Civil Servants in Ethical Public Financial Management",
                    "slug": "empowering-civil-servants-financial-management",
                    "summary": "KUI's Phase 1 training program equip county-level public accountants with anti-corruption frameworks.",
                    "content": "Through intensive practical workshops held across South Sudan's state capitals, KUI has successfully trained over 100 civil service officers in ethical public revenue stewardship and transparent budgeting...",
                    "featured_image": "/gallery/reconciliation-village-rwanda.jpg",
                    "author_id": admin_user.id,
                    "impact_category": "South Sudan",
                    "beneficiary_info": "100+ County Financial Officers & Local Administrators",
                    "location": "Juba & State Capitals, South Sudan",
                    "status": ContentStatus.PUBLISHED,
                    "published_at": datetime.utcnow()
                }
            ]
            for s in sample_impact:
                db.add(ImpactStory(**s))
            db.commit()
            print("--> Seeded initial published Impact Stories.")

        print("Successfully completed database seeding!")

    except Exception as e:
        print(f"Seeding warning/error: {e}")
    finally:
        db.close()
