CloudOps Portal README Update Notes
===================================

Use this document to update the README for `cloudops-portal` after the latest microservices milestone.

This update documents that the frontend now displays data from:

cloudops-portal -> core-api -> users-api

The frontend no longer only validates the status of `core-api`; it also consumes the `/users-summary` endpoint from `core-api`, which internally calls `users-api`.

------------------------------------------------------------
1. Update the project structure
------------------------------------------------------------

Replace the older structure that only mentions `cloudops-portal` and `core-api` with this updated structure:

```bash
cloud-ops-lab/
├── cloudops-portal/      # Frontend Next.js
├── core-api/             # Main backend API, Node.js + Express
├── users-api/            # Users microservice, Node.js + Express
└── docker-compose.yml    # Local orchestration with Docker Compose
```

Current repositories:

```bash
Frontend:
https://github.com/Darkreach2023/cloudops-portal

Core API:
https://github.com/Darkreach2023/cloudops-core-api

Users API:
https://github.com/Darkreach2023/cloudops-users-api
```

------------------------------------------------------------
2. Add users-api to the current project status
------------------------------------------------------------

Add this section to the current status area:

### Users API — `users-api`

- Microservice created with Node.js + Express
- API working locally
- API deployed publicly on DigitalOcean App Platform
- Containerized with Docker
- Runs locally through Docker Compose
- Environment variables configured locally and in the cloud
- `.env.example` available as a safe template
- CORS configured through `ALLOWED_ORIGINS`
- Healthcheck configured locally in `docker-compose.yml`
- Local container validated with `healthy` status
- Consumed internally by `core-api` through the `/users-summary` endpoint

Available endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Checks if users-api is running |
| GET | `/status` | Returns the service status |
| GET | `/users` | Returns all users |
| GET | `/users/:id` | Returns one user by ID |

------------------------------------------------------------
3. Update core-api endpoints
------------------------------------------------------------

In the `core-api` endpoint table, add the new `/users-summary` endpoint.

Updated table:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Checks if the API is running |
| GET | `/status` | Returns the service status |
| POST | `/test` | Receives test JSON data |
| GET | `/users-summary` | Calls `users-api` internally and returns a user summary |

------------------------------------------------------------
4. Update frontend integration
------------------------------------------------------------

The frontend currently consumes two endpoints from `core-api`:

```bash
GET /status
GET /users-summary
```

`GET /status` is used to display the current status of `core-api`.

`GET /users-summary` is used to display data coming from `users-api`, but accessed through `core-api`.

Expected `/users-summary` response:

```json
{
  "service": "core-api",
  "source": "users-api",
  "usersCount": 2,
  "users": [
    {
      "id": 1,
      "name": "Cesar Ramirez",
      "role": "admin"
    },
    {
      "id": 2,
      "name": "CloudOps User",
      "role": "viewer"
    }
  ]
}
```

The dashboard now displays:

```bash
Users Summary
Source: users-api
Users Count: 2

Cesar Ramirez — admin
CloudOps User — viewer
```

This confirms that the frontend is showing data coming from a backend microservice chain.

------------------------------------------------------------
5. Update local architecture
------------------------------------------------------------

### Local architecture

```bash
User
  ↓
http://localhost:3000
  ↓
cloudops-portal
  ↓
http://localhost:4000/users-summary
  ↓
core-api in Docker
  ↓
http://users-api:3001/users
  ↓
users-api in Docker
```

From the host machine, services are accessed through mapped ports:

```bash
core-api  -> http://localhost:4000
users-api -> http://localhost:4001
```

Inside Docker Compose, services communicate through the internal Docker network using service names:

```bash
core-api -> http://users-api:3001/users -> users-api
```

Important difference:

```bash
localhost:4000   # Host machine access to core-api
localhost:4001   # Host machine access to users-api
users-api:3001   # Internal Docker Compose service-to-service communication
```

------------------------------------------------------------
6. Update cloud architecture
------------------------------------------------------------

### Cloud architecture

```bash
User
  ↓
Vercel
cloudops-portal
  ↓
NEXT_PUBLIC_CORE_API_URL
  ↓
DigitalOcean App Platform
core-api
  ↓
USERS_API_URL
  ↓
DigitalOcean App Platform
users-api
```

Public core-api URL:

```bash
https://whale-app-6iffy.ondigitalocean.app
```

Public users-api URL:

```bash
https://cloud-users-api-4f2wi.ondigitalocean.app
```

Main public endpoints:

```bash
https://whale-app-6iffy.ondigitalocean.app/health
https://whale-app-6iffy.ondigitalocean.app/status
https://whale-app-6iffy.ondigitalocean.app/users-summary
https://cloud-users-api-4f2wi.ondigitalocean.app/health
https://cloud-users-api-4f2wi.ondigitalocean.app/users
```

Validated public integration:

```bash
curl https://whale-app-6iffy.ondigitalocean.app/users-summary
```

Expected response:

```json
{
  "service": "core-api",
  "source": "users-api",
  "usersCount": 2,
  "users": [
    {
      "id": 1,
      "name": "Cesar Ramirez",
      "role": "admin"
    },
    {
      "id": 2,
      "name": "CloudOps User",
      "role": "viewer"
    }
  ]
}
```

------------------------------------------------------------
7. Update environment variables
------------------------------------------------------------

Frontend local environment:

```env
NEXT_PUBLIC_CORE_API_URL=http://localhost:4000
```

Frontend production environment in Vercel:

```env
NEXT_PUBLIC_CORE_API_URL=https://whale-app-6iffy.ondigitalocean.app
```

Core API local environment:

```env
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
USERS_API_URL=http://users-api:3001
```

Core API production environment in DigitalOcean:

```env
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://cloudops-portal.vercel.app,https://cloudops-portal-git-main-cloud-ops-lab.vercel.app
USERS_API_URL=https://cloud-users-api-4f2wi.ondigitalocean.app
```

Users API local environment:

```env
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

Users API production environment in DigitalOcean:

```env
NODE_ENV=production
PORT=3001
ALLOWED_ORIGINS=https://cloudops-portal.vercel.app,https://cloudops-portal-git-main-cloud-ops-lab.vercel.app,https://whale-app-6iffy.ondigitalocean.app
```

Important notes:

- `.env` files should not be committed.
- `.env.example` files should be committed.
- `NEXT_PUBLIC_CORE_API_URL` is used by the frontend.
- `USERS_API_URL` is used by `core-api` to call `users-api`.
- In local Docker Compose, `USERS_API_URL` uses `http://users-api:3001`.
- In cloud, `USERS_API_URL` uses the public DigitalOcean URL of `users-api`.

------------------------------------------------------------
8. Add a Microservices Integration section
------------------------------------------------------------

## Microservices Integration

The project now includes communication between backend microservices.

`core-api` exposes the endpoint:

```bash
GET /users-summary
```

This endpoint does not store user data directly. Instead, it calls the `users-api` microservice and returns a summarized response.

Local flow:

```bash
cloudops-portal -> core-api -> users-api
```

Cloud flow:

```bash
Vercel -> core-api on DigitalOcean -> users-api on DigitalOcean
```

Local test:

```bash
curl http://localhost:4000/users-summary
```

Public cloud test:

```bash
curl https://whale-app-6iffy.ondigitalocean.app/users-summary
```

With this milestone, CloudOps Lab moved from a basic frontend-backend architecture into an initial microservices architecture.

------------------------------------------------------------
9. Update Docker Compose notes
------------------------------------------------------------

Docker Compose now orchestrates two backend services:

```bash
core-api
users-api
```

Expected containers:

```bash
core-api-container
users-api-container
```

Expected local ports:

```bash
core-api  -> http://localhost:4000
users-api -> http://localhost:4001
```

Command to rebuild and start both services:

```bash
docker compose down
docker compose up -d --build
```

Validation commands:

```bash
docker ps
curl http://localhost:4000/status
curl http://localhost:4001/users
curl http://localhost:4000/users-summary
```

Expected result:

- `core-api-container` should be healthy.
- `users-api-container` should be healthy.
- `/users-summary` should return data from `users-api`.

------------------------------------------------------------
10. Update roadmap
------------------------------------------------------------

### Phase 3 — Microservices

- Create users-api microservice
- Dockerize users-api
- Add users-api to Docker Compose
- Configure local service-to-service communication
- Create GitHub repository for users-api
- Deploy users-api on DigitalOcean App Platform
- Configure `USERS_API_URL` in core-api
- Validate cloud service-to-service communication
- Display users summary in the frontend dashboard

Status: advanced in progress.

------------------------------------------------------------
11. Update estimated progress
------------------------------------------------------------

## Estimated Project Progress

```bash
Overall CloudOps Lab progress: 65% - 70%
```

Progress by phase:

```bash
Phase 1 — Project base: 95%
Phase 2 — Docker and Docker Compose: 95%
Phase 2.5 — Public backend deployment: 100%
Phase 3 — Microservices: 55% - 60%
Phase 4 — Kubernetes / Advanced Cloud: 5%
Phase 5 — CI/CD / Monitoring / Security: 15% - 20%
```

------------------------------------------------------------
12. Suggested Git commit
------------------------------------------------------------

After updating the `cloudops-portal` README, use:

```bash
cd ~/cloud-ops-lab/cloudops-portal
git status
git add README.md
git commit -m "Document frontend microservices integration"
git push
```

If `app/page.tsx` is already clean and committed, only `README.md` should appear as modified.
