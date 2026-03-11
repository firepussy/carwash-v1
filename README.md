# Car Wash MVP

Production-quality MVP for managing a premium car wash, built with Next.js 14, Prisma, PostgreSQL, React Query, Zustand, and Tailwind.

## Features
- Credentials login with JWT session cookie
- Dashboard analytics cards + tables
- Bookings CRUD workflow
- Operations board with live polling
- Clients CRM with vehicles, visits, and total spent
- Full API routes (GET/POST/PATCH/DELETE)
- Prisma schema + migration + seed

## Project Structure

```txt
carwash-mvp/
app/
  login/
  dashboard/
  bookings/
  operations/
  clients/
components/
  ui/
  dashboard/
  bookings/
  operations/
  clients/
lib/
store/
server/routes/
prisma/
```

## Local Setup
1. Copy env:
   ```bash
   cp .env.example .env
   ```
2. Install:
   ```bash
   npm install
   ```
3. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Seed data:
   ```bash
   npm run seed
   ```
5. Start app:
   ```bash
   npm run dev
   ```

## Deploy on Vercel (Step-by-Step)

### 1) Push repository to GitHub
Make sure this project is in a GitHub repo connected to your Vercel account.

### 2) Create a PostgreSQL database
Use any managed PostgreSQL provider (Neon, Supabase, Railway, Render, RDS, etc.).
Copy the connection string in this format:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME?sslmode=require
```

### 3) Import project in Vercel
- Go to **Vercel Dashboard → Add New Project**
- Import your GitHub repository
- Framework preset should be auto-detected as **Next.js**

### 4) Configure Environment Variables in Vercel
In **Project Settings → Environment Variables**, add:

- `DATABASE_URL` = your Postgres URL
- `JWT_SECRET` = a long random secret (at least 32 chars)

Add them for **Production** (and Preview if needed).

### 5) Configure Build Command for Prisma migrations
In **Project Settings → Build & Development Settings**:
- Build Command:
  ```bash
  npm run vercel-build
  ```

This command runs:
- `prisma generate`
- `prisma migrate deploy`
- `next build`

### 6) Deploy
Trigger deploy from Vercel UI (or by pushing to `main`).

### 7) Seed production data (optional)
Vercel should not auto-seed production by default. Run seed manually from a trusted environment:

```bash
DATABASE_URL="<production_database_url>" npm run seed
```

## Default Users (from seed)
- `admin@carwash.com` / `password123`
- `staff@carwash.com` / `password123`
- `owner@carwash.com` / `password123`

## API Endpoints
- `/api/auth/login`
- `/api/clients`
- `/api/vehicles`
- `/api/services`
- `/api/bookings`
- `/api/orders`
- `/api/dashboard`

## Useful Scripts
```bash
npm run dev
npm run build
npm run vercel-build
npm run seed
```


## Troubleshooting Vercel `404: NOT_FOUND`

If Vercel shows:

```
404: NOT_FOUND
Code: NOT_FOUND
```

it is usually a project configuration issue (not an app route bug).

Check these in **Vercel Project Settings**:

1. **Root Directory**
   - Must point to this Next.js project root (folder containing `package.json` and `app/`).
2. **Framework Preset**
   - Must be **Next.js**.
3. **Output Directory**
   - Leave empty/default for Next.js.
4. **Build Command**
   - Use `npm run vercel-build`.
5. **Environment Variables**
   - `DATABASE_URL` and `JWT_SECRET` must be set for Production.
6. **Redeploy**
   - Trigger a fresh deploy after updating settings.

After deploy, verify:
- `https://<your-domain>/login`
- `https://<your-domain>/api/health`

If `/api/health` works but `/` still fails, check domain assignment for the latest deployment in Vercel’s **Domains** tab.

Also verify you are opening the **current deployment URL** from Vercel (not an old one). In Vercel, open the latest successful deployment and use **Visit** or reassign aliases to it.


## Incident Runbook: Vercel `404: NOT_FOUND`

If you still get Vercel platform 404 (with an ID like `arn1::...`), use this exact flow.

### A) Validate the URL and deployment status
1. Open Vercel project → **Deployments**.
2. Click the latest successful deployment and use **Visit**.
3. Confirm the URL is exactly that deployment URL (no extra path typo).

### B) Ensure the deployment exists and is not stale
- In **Deployments**, confirm the deployment is **Ready** and not deleted.
- In **Domains**, verify your production/custom domain is assigned to the latest deployment alias.

### C) Check build/runtime logs
- Open deployment → **Functions / Logs** and look for build errors.
- Ensure project settings are:
  - Root Directory = this app folder
  - Framework Preset = Next.js
  - Build Command = `npm run vercel-build`
  - Output Directory = empty/default

### D) Verify permissions and team/project access
- Confirm you are viewing the correct Vercel team/account.
- Confirm your role has access to project deployments and domains.

### E) Optional CLI diagnostics
```bash
npx vercel whoami
npx vercel ls
npx vercel inspect <deployment-url>
npx vercel logs <deployment-url>
```

### F) Post-fix smoke tests
- `https://<domain>/`
- `https://<domain>/login`
- `https://<domain>/api/health`

If `/api/health` returns JSON but the domain root still fails, the domain alias is likely mapped to an older/removed deployment. Reassign the alias to the latest ready deployment.
