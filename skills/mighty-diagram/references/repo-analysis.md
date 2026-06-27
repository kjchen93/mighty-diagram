# Repo analysis

How to turn a repository into a grounded, evidence-backed model you can diagram. The goal is
**accuracy over completeness** — ground every component in a real file so the diagram never
invents services.

## Contents
- [Pipeline overview](#pipeline-overview)
- [Step 1 — Scan high-signal files](#step-1--scan-high-signal-files)
- [Step 2 — Detection-rule catalog](#step-2--detection-rule-catalog)
- [Step 3 — Build the facts inventory](#step-3--build-the-facts-inventory)
- [Step 4 — Choose the view](#step-4--choose-the-view)
- [Step 5 — Explain then map](#step-5--explain-then-map)
- [Size bounds](#size-bounds)

## Pipeline overview

Deterministic scan → grounded facts → reason (explain) → structure (map) → draw (SVG).
Grounding the model in parsed facts before it reasons is the single biggest reducer of
hallucinated components. Use your own tools (Glob, Grep, Read) — no scripts required.

## Step 1 — Scan high-signal files

Read these first, in priority order. Stop when you have a clear picture; you rarely need the
whole repo.

1. **`docker-compose.yml` / `compose.yaml`** — the richest single source: service names,
   `image:` (reveals datastores/queues/caches), `ports`, `depends_on` (edges), `environment`.
2. **Dependency manifests** (direct deps only, not lockfiles): `package.json`,
   `pyproject.toml` / `requirements.txt` / `Pipfile`, `go.mod`, `Cargo.toml`,
   `pom.xml` / `build.gradle(.kts)`, `composer.json`, `Gemfile`, `*.csproj`, `pubspec.yaml`,
   `mix.exs`.
3. **`Dockerfile`(s)** — runtime/language (`FROM`), exposed ports (`EXPOSE`), entrypoint
   (`CMD`/`ENTRYPOINT`). Multiple service dirs each with a Dockerfile ⇒ microservices.
4. **Kubernetes / Helm** — `*.yaml` Deployment/Service/Ingress/StatefulSet, `Chart.yaml`,
   `values.yaml`. **Terraform** `*.tf` (managed cloud services: RDS, S3, SQS, DynamoDB,
   Lambda). **`serverless.yml`** (functions + event triggers).
5. **`.env.example` / `.env.sample`** — external dependencies by variable name (see catalog).
6. **`README`** — stated architecture, components, and the primary user flow.
7. **CI** (`.github/workflows/*`, `.gitlab-ci.yml`, `Jenkinsfile`) and **PaaS** files
   (`Procfile` process types, `fly.toml`, `vercel.json`, `render.yaml`) — runtime topology.
8. **Routes / entrypoints** — `main.*`, `index.*`, `app.*`, controllers/route dirs, OpenAPI
   specs, `*.proto`, `schema.graphql`.
9. **Filtered directory tree** — top 2–3 levels for structure (monorepo `apps/`/`packages/`/
   `services/`, `frontend/`+`backend/`, Go `cmd/`).

**Always exclude:** `node_modules/`, `vendor/`, `dist/`, `build/`, `.git/`, lockfiles
(`*-lock.*`, `*.lock`, `go.sum`), and binary assets. They bury signal and waste budget.

## Step 2 — Detection-rule catalog

Map evidence → component type. (Representative, not exhaustive — extend by analogy.)

**Frontend** — deps `react`, `vue`, `@angular/core`, `svelte`, `next`, `nuxt`; files
`next.config.*`, `angular.json`, `vite.config.*`, `index.html`. → icon `app-window` / `monitor` / `globe`.

**Backend / API framework** — `express`, `fastify`, `@nestjs/*`, `koa` (Node); `django`,
`flask`, `fastapi` (Python; `manage.py`, `wsgi.py`/`asgi.py`); `spring-boot` (Java); `rails`
(Ruby); `gin`/`echo`/`fiber` (Go); `laravel`/`symfony` (PHP); ASP.NET (`.csproj`). →
`server` / `webhook`.

**Database** — compose images `postgres`/`mysql`/`mariadb`/`mongo`/`cockroach`; clients `pg`,
`psycopg2`, `sqlalchemy`, `prisma` (`schema.prisma`), `typeorm`, `mongoose`, `gorm`,
`sequelize`; `migrations/`, `*.sql`; env `DATABASE_URL`, `MONGO_URI`. → `database`.

**Cache** — image `redis`/`memcached`; clients `redis`, `ioredis`; env `REDIS_URL`. → `zap`.

**Queue / streaming / workers** — images `rabbitmq`/`kafka`/`nats`; libs `kafkajs`,
`amqplib`/`pika`, `celery`, `bullmq`, `sidekiq`, `nats`; `Procfile` `worker:`; env
`KAFKA_BROKERS`, `RABBITMQ_URL`. → `inbox` / `list` (queue), `repeat` / `cog` (worker/scheduler).

**Object / file storage** — Terraform `aws_s3_bucket`; libs `@aws-sdk/client-s3`, `boto3`;
env `S3_BUCKET`, `AWS_S3_*`. → `hard-drive` / `package`.

**External SaaS** — env or deps: `STRIPE_*` (payments → `credit-card`), `TWILIO_*`,
`SENDGRID_*`/`SMTP_*`/`mail` (email → `mail`), `OPENAI_*`/`ANTHROPIC_*` (LLM → `cpu`/`cloud`),
`SENTRY_DSN`/`DATADOG_*` (observability → `activity`), generic third-party API → `cloud` / `plug`.

**Cloud / infra** — Terraform provider, `AWS_*`/`GCP_*`/`AZURE_*` env, k8s/Helm presence. →
`cloud` / `network`; container/module grouping → `box` / `layers`.

**Auth** — `passport`, `next-auth`, `@auth/*`, `jsonwebtoken`, OAuth client libs; env
`JWT_SECRET`, `OAUTH_*`, `AUTH0_*`. → `key` / `shield`.

**CI / VCS** — `.github/workflows`, `.gitlab-ci.yml`. → `git-branch`.

**Users / actors** — inferred (end user, admin) for workflow views. → `users`.

See `references/icons.md` for the full component-type → icon mapping.

## Step 3 — Build the facts inventory

Produce an in-context list of components, each tagged with **evidence** (the file/line it came
from). This both grounds the diagram and lets you explain it. Example:

- `Web frontend` — React (from `package.json` dep `react`, `frontend/` dir)
- `API server` — FastAPI (from `pyproject.toml` dep `fastapi`, `app/main.py`)
- `PostgreSQL` — datastore (from `docker-compose.yml` service `db`, image `postgres:16`)
- `Redis` — cache (from `docker-compose.yml` service `redis`; `REDIS_URL` in `.env.example`)
- `Stripe` — payments SaaS (from `STRIPE_SECRET_KEY` in `.env.example`)
- Edges: `web → api` (frontend calls API), `api → db`, `api → redis`, `api → stripe`

Treat compose/k8s/`.env.example` as *intent* — cross-check against actual code usage where
quick; note anything uncertain rather than asserting it.

## Step 4 — Choose the view

Auto-detect the best-fitting view, then propose it (the developer can override). Default is
**component/architecture**.

| View | Best when | Shape |
|------|-----------|-------|
| **Component / architecture** (default) | compose/k8s with several services; or a monolith (split its core into 2–4 internal nodes) | grouped boxes of services/datastores/queues/external SaaS + edges |
| **Tech stack** | libraries, CLIs, or "show me what's in here" | groups = languages / frameworks / datastores / infra / SaaS, as labeled tiles |
| **User workflow** | clear user-facing routes/entrypoints (controllers, OpenAPI, a documented flow) | left→right steps of the primary journey through the system |

Heuristics: many services / Dockerfiles → component; one app, MVC layout → component (core
split); rich routes or a README "how it works" → also offer user-workflow; package with no
services → tech-stack. Monorepo (multiple manifests) → offer a top-level overview plus optional
per-service diagrams rather than one crowded diagram.

## Step 5 — Explain then map

Keep these two passes separate (doing both at once degrades accuracy):

1. **Explain** — write a short plain-English architecture from the facts inventory: the
   subsystems, how data/requests flow, and the boundaries. **Do not assume it is a web app** —
   it might be a CLI, library, data pipeline, mobile app, or service mesh.
2. **Map** — turn the explanation into structured `{ groups, nodes, edges }`:
   - every node corresponds to a real component from the inventory (constrain to things that
     exist — no invented files/services);
   - assign each node to a group (lane) and pick its icon;
   - list edges as `source → target` following the dominant flow;
   - choose the optional outer frame (a deployment boundary) and at most one or two dashed
     sub-groups (a meaningful internal boundary).

Then hand the map to the SVG step (`references/svg-authoring.md`).

## Size bounds

High signal beats completeness. Target **~15–25 nodes**, a handful of groups, and a few dozen
edges. Exclude tests, config, and tiny helpers unless architecturally central. Break one
central subsystem into 2–4 nodes rather than drawing a single opaque black box. If the system
is genuinely larger, produce a top-level overview and offer to drill into a subsystem.
