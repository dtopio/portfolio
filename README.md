# Danil Top — Portfolio

A single-page developer portfolio with a React (Vite + TypeScript) frontend and a
Laravel REST API backend. All content (skills, projects, experience) is served as
JSON from the backend so it can be edited without touching frontend code.

## Architecture

```
portfolio/
├── frontend/   React 19 + TypeScript + Vite + Tailwind CSS v4 + React Router
└── backend/    Laravel 13 (PHP 8.3) REST API, SQLite by default
```

- The frontend is a single page (`/`) composed of sections (Hero, About, Skills,
  Projects, Experience, Contact) that fetch their data from the API on mount.
- The backend exposes read-only JSON endpoints for portfolio content and one
  write endpoint for the contact form. CORS is restricted to the frontend's origin.

### API endpoints

| Method | Path            | Description                          |
|--------|-----------------|---------------------------------------|
| GET    | `/api/skills`     | Skills grouped by category          |
| GET    | `/api/projects`   | Projects with tech stack & tags     |
| GET    | `/api/experience` | Work / teaching / education timeline|
| POST   | `/api/contact`    | Submit the contact form             |

## Prerequisites

- PHP 8.2+ and [Composer](https://getcomposer.org)
- Node.js 18+ and npm

## Backend setup

```bash
cd backend
composer install
cp .env.example .env        # already done if you cloned this scaffold as-is
php artisan key:generate
touch database/database.sqlite   # only needed if it doesn't already exist
php artisan migrate
php artisan db:seed
php artisan serve            # http://localhost:8000
```

The API is now available at `http://localhost:8000/api`.

`FRONTEND_URLS` in `backend/.env` controls which origins are allowed to call the
API (CORS). It defaults to `http://localhost:5173`, matching the Vite dev server.

## Frontend setup

```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_BASE_URL if your backend runs elsewhere
npm run dev             # http://localhost:5173
```

## Production build

```bash
# Frontend
cd frontend
npm run build           # outputs static files to frontend/dist
npm run preview          # locally preview the production build

# Backend
cd backend
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
```

Serve `frontend/dist` from any static host (Nginx, Vercel, Netlify, etc.) and point
its `VITE_API_BASE_URL` at your deployed Laravel API. For a relational database in
production, switch `DB_CONNECTION` in `backend/.env` from `sqlite` to `mysql`/`pgsql`
and update the matching `DB_*` variables.

## Editing content

All portfolio content lives in the database seeders:

- `backend/database/seeders/SkillSeeder.php`
- `backend/database/seeders/ProjectSeeder.php`
- `backend/database/seeders/ExperienceSeeder.php`

Edit the arrays in those files and re-run `php artisan db:seed` (or
`php artisan migrate:fresh --seed` to start clean) to update the data the
frontend displays.

To add a real CV, drop a `cv.pdf` file into `frontend/public/` — the Hero and
footer "Download CV" links already point at `/cv.pdf`.
