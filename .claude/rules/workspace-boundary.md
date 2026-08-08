# Workspace Boundary

Jurnii is a multi-package monorepo. Each package owns one concern. Crossing the boundary requires an explicit reason in the PR body.

- `app/` — Next.js presentation layer. UI, routes, GraphQL queries via URQL, Redux state for view concerns. No business logic that belongs in `services/`. No direct OpenAI/HyperBrowser/MinIO calls — go through services.
- `services/` — Express + LangGraph backend. Workflow logic, AI agents, external integrations, repositories. No JSX, no Tailwind, no React. Talks to Hasura, never directly to Postgres.
- `cms/` — Strapi. Heuristics and editorial content. No app or services code.
- `extension/` — Chrome extension. Capture only. Posts to services API, does not embed business logic.
- `infrastructure/` — Pulumi IaC. No application code.
- `nix/` — environment, not code.

Backend logic appearing under `app/src/app/api/**` is a smell — route through services unless the endpoint is a thin Next.js-only concern (auth callback, webhook receiver). State that. Frontend logic appearing under `services/src/**` is a defect.

Generated artifacts (`src/gql/*.ts`, `services/src/workers/*.js`, `dist/**`, `.next/**`) are owned by their generators, not by humans or agents. See `graphql-codegen-source-of-truth.md`.
