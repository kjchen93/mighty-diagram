# Example gallery

Real diagrams produced by **mighty-diagram** from actual repositories. Each is a self-contained
`.svg` (recolor by editing its `:root` block); the `.png` is a rendered preview.

## Microservices — event-driven CQRS (PwC palette)

Generated from [`mehdihadeli/food-delivery-microservices`](https://github.com/mehdihadeli/food-delivery-microservices).
Clients sit **outside** the deployment frame; a YARP gateway routes to vertical-slice services;
a RabbitMQ bus and a dashed "Polyglot Persistence (CQRS)" data group complete the picture.
Palette: **pwc** (the default).

![Microservices architecture](microservices-food-delivery.png)

## Web app — compose pipeline (reference palette)

Generated from the classic [`dockersamples/example-voting-app`](https://github.com/dockersamples/example-voting-app).
Front-tier web apps and a back-tier async pipeline (Redis → Worker → Postgres) inside a Docker
Compose boundary. Palette: **reference** (the original maroon/orange look) — shown to illustrate
that any preset or custom colors work.

![Voting app architecture](web-app-voting.png)

## Library — no deployment boundary (PwC palette)

Generated from [`psf/requests`](https://github.com/psf/requests). A library has no services or
deployment boundary, so there is **no outer frame** — a module/dependency overview instead, with
a dashed "Optional extras" group. Palette: **pwc**.

![requests library overview](library-requests.png)

---

Want a different view, palette, or your own repo? Just ask the skill — see the
[main README](../README.md) and [SKILL.md](../skills/mighty-diagram/SKILL.md).
