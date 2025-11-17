# SmartFarmLink v3.1

An agriculture platform for African farmers with AI crop advisor, disease detection, marketplace, and more.

## Architecture Summary
- **Backend**: Django REST Framework with PostgreSQL, JWT auth, and AI integrations.
- **Frontend**: React with Tailwind CSS, PWA support.
- **AI**: TensorFlow for disease detection, OpenAI for chat (with mocks).
- **DevOps**: Docker, Celery for tasks, Redis for caching.

## Quick Start (One Command)
1. Clone repo.
2. `docker-compose up --build` (runs full stack).
3. Visit http://localhost:3000 (frontend) and http://localhost:8000/api/v1/docs/ (Swagger).

## Local Dev Setup
- Backend: `cd backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python manage.py migrate && python manage.py seed_data`.
- Frontend: `cd frontend && npm install && npm start`.
- Tests: `cd backend && pytest` and `cd frontend && npm test`.

## Deployment
- Heroku: Use `heroku.yml` for buildpacks.
- GCP/AWS: Containerize and deploy via Kubernetes.

## Swapping Mocks
- Add real keys to `.env` (e.g., OPENAI_API_KEY).
- For M-Pesa: Update `apps/payments/views.py` with live credentials.

See CHANGELOG.md for evolution.