# Kussala Digital Platform — System Architecture & Institutional Blueprint

---

## 1. System Architecture & Component Interaction

The **Kussala Digital Platform** is designed as a decoupled, multi-tier institutional ecosystem consisting of four distinct operational layers:

```
                    KUSSALA DIGITAL PLATFORM

                         INTERNET
                            |
             +--------------+--------------+
             |              |              |
             v              v              v
      PUBLIC WEBSITE    ADMIN PORTAL       LMS
      kussalainstitute   admin.kussala     lms.kussala
          .org            institute.org      institute.org
      (React / Vite)    (React / Vite)     (Moodle 4.x)
             |              |
             |              |
             +-------+------+
                     |
                     v
             KUSSALA BACKEND API
             api.kussalainstitute.org
             (FastAPI / Python 3.12)
                     |
                     v
                 PostgreSQL
        +------------+------------+
        |            |            |
      Users       Content       Audit
     & Roles     & Media        Logs
```

### Layer Responsibilities

1. **Public Presentation Layer (`kussalainstitute.org`)**:
   - Built with React 19, Vite 7, Wouter, Tailwind CSS v4, Framer Motion, and TanStack React Query.
   - Consumes published institutional content from the backend (`/api/v1/articles`, `/api/v1/news`, `/api/v1/impact`).
   - Contains 100% static fallback content ensuring site availability even during backend maintenance.

2. **Administrative Management Layer (`admin.kussalainstitute.org`)**:
   - Secure React + Vite dashboard for Kussala staff.
   - Enforces a multi-step editorial publishing workflow (`Draft` → `Submitted` → `In Review` → `Approved` → `Published` → `Archived`).

3. **Authoritative Institutional Data Layer (`api.kussalainstitute.org`)**:
   - Powered by Python 3.12, FastAPI, SQLAlchemy 2.0, Alembic, Pydantic v2, PyJWT, and Bcrypt.
   - Enforces strict server-side Role-Based Access Control (RBAC), data validation, and public filtering (`status = 'published'`).

4. **Learning Management Layer (`lms.kussalainstitute.org`)**:
   - Independent Moodle 4.x instance serving the 20-student pilot cohort (Ethical Leadership Academy).

---

## 2. Database Schema Specification

### Core Entities & Relationships

```
+-------------------+        +-------------------+        +-------------------+
|       User        |        |      Article      |        |     Category      |
+-------------------+        +-------------------+        +-------------------+
| id (UUID)         |<-------| id (UUID)         |------->| id (UUID)         |
| email (VARCHAR)   |        | title (VARCHAR)   |        | name (VARCHAR)    |
| password_hash     |        | slug (VARCHAR)    |        | slug (VARCHAR)    |
| full_name         |        | excerpt (TEXT)    |        | category_type     |
| role (ENUM)       |        | content (TEXT)    |        +-------------------+
| is_active (BOOL)  |        | featured_image    |
+-------------------+        | author_id (FK)    |
          |                  | category_id (FK)  |
          |                  | status (ENUM)     |
          |                  | published_at      |
          |                  +-------------------+
          |                            |
          +----------------------------+-----------------------------+
          |                                                          |
          v                                                          v
+-------------------+                                      +-------------------+
|       News        |                                      |   ImpactStory     |
+-------------------+                                      +-------------------+
| id (UUID)         |                                      | id (UUID)         |
| title (VARCHAR)   |                                      | title (VARCHAR)   |
| slug (VARCHAR)    |                                      | slug (VARCHAR)    |
| excerpt (TEXT)    |                                      | summary (TEXT)    |
| content (TEXT)    |                                      | content (TEXT)    |
| featured_image    |                                      | impact_category   |
| status (ENUM)     |                                      | beneficiary_info  |
| published_at      |                                      | location          |
+-------------------+                                      +-------------------+
```

---

## 3. Security & Access Control Policy (RBAC)

### User Roles & Permissions Matrix

| Permission / Operation | SUPER_ADMIN | ADMIN | EDITOR | CONTRIBUTOR | PUBLIC / ANONYMOUS |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **View Published Content** | Yes | Yes | Yes | Yes | Yes |
| **View Draft / Private Content** | Yes | Yes | Yes | Own Drafts Only | No |
| **Create Draft Content** | Yes | Yes | Yes | Yes | No |
| **Submit Content for Review** | Yes | Yes | Yes | Yes | No |
| **Approve / Publish Content** | Yes | Yes | Yes | **NO (HTTP 403)** | No |
| **Manage Users & Roles** | Yes | Yes | No | No | No |
| **View Audit Logs** | Yes | Yes | No | No | No |

---

## 4. Media Storage Abstraction Specification

The media layer uses a provider pattern:
- **`LocalStorageProvider`**: Saves files locally to `./uploads/` with UUID-renamed filenames and strict MIME-type validation (`image/jpeg`, `image/png`, `image/webp`, `application/pdf`).
- **Cloud Storage Hooks**: Modularly configurable via environment variable `MEDIA_STORAGE_PROVIDER` to switch seamlessly to Amazon S3, Cloudflare R2, Cloudinary, or Supabase Storage without code changes.

---

## 5. Environment Variables Guide (`.env.example`)

```env
# Server Configuration
PROJECT_NAME="Kussala Institute Digital Platform API"
VERSION="1.0.0"
API_V1_STR="/api/v1"

# Database
DATABASE_URL="postgresql://kussala_admin:secure_password@localhost:5432/kussala_db"

# Security & Authentication
JWT_SECRET="kussala_institute_super_secret_jwt_key_2026_change_in_prod"
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# Media Storage Provider
MEDIA_STORAGE_PROVIDER="local"
UPLOAD_DIR="uploads"
MAX_FILE_SIZE_BYTES=10485760

# Dedicated LMS (Moodle)
MOODLE_BASE_URL="https://lms.kussalainstitute.org"
MOODLE_API_TOKEN="your_moodle_webservice_token"
```

---

## 6. Moodle LMS Strategy (`lms.kussalainstitute.org`)

### Pilot Cohort Requirements (20 Students)
- Host independent Moodle 4.x instance under `lms.kussalainstitute.org`.
- **Course**: Ethical Leadership & Peacebuilding (Pilot Cohort 1).
- **Phase 1 Integration**: Direct header button link from main website to Learning Portal (`https://lms.kussalainstitute.org`).
- **Phase 2 Web Services Roadmap**: Use Moodle REST API (`core_course_get_courses`, `core_user_create_users`, `enrol_manual_enrol_users`) to sync course catalogues and student progress onto the main website.

---

## 7. Disaster Recovery & Backup Protocol

### PostgreSQL Automated Backup Command
```bash
pg_dump -h localhost -U kussala_admin -d kussala_db -F c -b -v -f "/backups/kussala_db_$(date +%Y%m%d_%H%M%S).dump"
```

### Restoration Runbook
```bash
# 1. Restore Database Schema & Data
pg_restore -h localhost -U kussala_admin -d kussala_db -v "/backups/kussala_db_20260817.dump"

# 2. Re-run Seeding Verification
python backend/seed.py
```
