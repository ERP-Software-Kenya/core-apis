# Secret Hygiene

Secrets never enter the repo, the logs, or the LLM context window.

Banned:
- Writing or modifying any `.env*` file. If a new env var is needed, add it to `.env.example` (with a placeholder value), document it, and tell the user to set the real value locally.
- Committing API keys, OAuth tokens, JWT secrets, Hasura admin secrets, MinIO credentials, OpenAI keys, Liveblocks keys, Inngest signing keys, or service-account JSON in any form — including in tests, docs, or PR descriptions.
- Logging full request headers, full prompt payloads containing user data, full Hasura responses containing PII, full screenshot captures (which may include forms with credentials), or raw browser cookies.
- Embedding tokens in client-side code (`app/`). Public env vars must be `NEXT_PUBLIC_*` and explicitly safe to expose.
- Reading secrets via `process.env.X` outside the env module. See `zod-at-boundaries.md`.

Required:
- Redact tokens, keys, emails, and session IDs in any error message that may surface to a user, get logged, or appear in an Inngest event payload.
- Screenshots stored in MinIO that may contain PII go behind signed URLs, never public buckets.
- When the user asks to debug an auth/token issue, request the symptom and the redacted log line — do not ask them to paste the raw token.

If a secret is committed by accident, do not just delete the line. Rotate the credential, then remove. Tell the user immediately.
