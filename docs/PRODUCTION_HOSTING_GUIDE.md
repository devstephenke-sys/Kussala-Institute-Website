# Kussala Digital Platform — Free Production Hosting Guide

This guide provides step-by-step instructions for deploying the **Kussala Digital Platform** to production using zero-cost / free-tier infrastructure.

---

## Target Architecture & Subdomains

| Component | Subdomain | Technology Stack | Recommended Free Host |
| :--- | :--- | :--- | :--- |
| **Public Website** | `kussalainstitute.org` | React + Vite + Tailwind CSS | Vercel / Cloudflare Pages |
| **Admin Portal** | `admin.kussalainstitute.org` | React + Vite + Tailwind CSS | Vercel / Cloudflare Pages |
| **Backend API** | `api.kussalainstitute.org` | Python 3.12 + FastAPI + Uvicorn | Render / Railway / Fly.io |
| **Database** | *Internal connection* | PostgreSQL 16 | **Neon PostgreSQL (Free Tier)** |
| **LMS Portal** | `lms.kussalainstitute.org` | Moodle 4.x | Hetzner / DigitalOcean ($4/mo) or Render Docker |

---

## Step 1: Set Up Free Neon PostgreSQL Database

[Neon](https://neon.tech) provides a fully managed, serverless PostgreSQL database with a generous free tier (0.5 GiB storage, branch support, high availability).

### 1.1 Create Database Instance
1. Go to [https://neon.tech](https://neon.tech) and sign up for a free account.
2. Click **Create Project**, name it `kussala-platform-db`, and select the region closest to East Africa (e.g., `eu-central-1` Frankfurt or `me-central-1` UAE).
3. Once created, Neon will show your connection string formatted as:
   ```text
   postgresql://kussala_owner:AbCdEf123456@ep-cool-name-123456.eu-central-1.aws.neon.tech/kussala_db?sslmode=require
   ```
4. Copy this string. This is your production `DATABASE_URL`.

---

## Step 2: Deploy Python FastAPI Backend API (`api.kussalainstitute.org`)

[Render](https://render.com) provides free web service hosting for Python applications with automatic SSL certificate provisioning.

### 2.1 Prepare Web Service on Render
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Deploying Kussala Digital Platform"
   git push origin main
   ```
2. Log into [Render Dashboard](https://dashboard.render.com) and click **New +** → **Web Service**.
3. Connect your GitHub repository (`KUSSALA-INSTITUTE-`).
4. Configure service settings:
   - **Name**: `kussala-backend-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`

### 2.2 Configure Environment Variables on Render
In the **Environment** tab on Render, add:

| Key | Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://...` (Your Neon connection string) | Database Connection |
| `JWT_SECRET` | Generate a 64-char random string | Token Signing Key |
| `MEDIA_STORAGE_PROVIDER` | `local` (or `cloudinary` / `s3`) | File Storage Provider |
| `CORS_ORIGINS` | `["https://kussalainstitute.org", "https://admin.kussalainstitute.org"]` | Production CORS |

### 2.3 Initialize Production Database Schema
Run database migration and seed initial superadmin account:
```bash
cd backend
export DATABASE_URL="postgresql://user:pass@ep-cool-name.neon.tech/kussala_db?sslmode=require"
python seed.py
```

### 2.4 Attach Custom Subdomain
In Render settings, under **Custom Domains**, add `api.kussalainstitute.org`. Render will generate a CNAME record for DNS configuration.

---

## Step 3: Deploy Public Website (`kussalainstitute.org`)

[Vercel](https://vercel.com) provides free global CDN hosting for React/Vite applications.

### 3.1 Deploy to Vercel
1. Go to [https://vercel.com](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository (`KUSSALA-INSTITUTE-`).
3. Configure settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `artifacts/kislp-website`
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `dist/public`
4. Add Environment Variable:
   - `VITE_PUBLIC_API_URL` = `https://api.kussalainstitute.org/api/v1`
5. Click **Deploy**.

### 3.2 Attach Custom Domain
In Vercel Project Settings → **Domains**, add `kussalainstitute.org` and `www.kussalainstitute.org`.

---

## Step 4: Deploy Admin Portal (`admin.kussalainstitute.org`)

### 4.1 Deploy Admin Project on Vercel
1. On Vercel, click **Add New Project** again.
2. Select the same repository (`KUSSALA-INSTITUTE-`).
3. Configure settings:
   - **Project Name**: `kussala-admin-portal`
   - **Framework Preset**: `Vite`
   - **Root Directory**: `artifacts/kislp-admin`
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://api.kussalainstitute.org/api/v1`
5. Click **Deploy**.

### 4.2 Attach Custom Subdomain
In Vercel Project Settings → **Domains**, add `admin.kussalainstitute.org`.

---

## Step 5: Moodle LMS Deployment (`lms.kussalainstitute.org`)

For the initial 20-student pilot cohort (Ethical Leadership Academy):
1. Provision a lightweight VM (Hetzner Cloud / DigitalOcean droplet for ~$4/month) or Docker container on Render.
2. Install Moodle 4.4 with PHP 8.2 & PostgreSQL.
3. Configure site name to "Kussala Leadership Portal" and attach custom domain `lms.kussalainstitute.org`.
4. Enable Moodle Web Services API (`Site Administration` → `Server` → `Web Services`) to allow future automated enrolment sync from main backend.

---

## Step 6: Production DNS Configuration Summary

In your domain registrar DNS manager (e.g. Cloudflare, Namecheap, GoDaddy):

| Record Type | Name / Host | Value / Target | Purpose |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` (Vercel IP) | Public Website |
| **CNAME** | `www` | `cname.vercel-dns.com` | Public Website Alias |
| **CNAME** | `admin` | `cname.vercel-dns.com` | CMS Admin Portal |
| **CNAME** | `api` | `kussala-backend-api.onrender.com` | Python FastAPI Backend |
| **CNAME** | `lms` | `your-moodle-server-ip.or-host.com` | Moodle LMS Portal |

---

## Production Security Check-List

- [x] HTTPS forced across all 4 subdomains.
- [x] PostgreSQL database password stored securely in Neon secret manager.
- [x] JWT secret key configured with strong random key.
- [x] CORS explicitly restricted to `https://kussalainstitute.org` and `https://admin.kussalainstitute.org`.
- [x] Public endpoints restricted to return only `status = 'published'` content.
