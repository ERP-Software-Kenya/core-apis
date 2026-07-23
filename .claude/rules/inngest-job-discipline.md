# Inngest Job Discipline

paths: services/src/**/*inngest*, services/src/**/*.job.ts

Inngest functions are durable, retried, and observed. Code written for Inngest is not the same as code written for a request handler.

- Every Inngest function is idempotent. Running it twice with the same event must produce the same end state. Side effects that cannot be made idempotent (sending an email, charging a card) are wrapped in `step.run` with a stable step ID so retries do not duplicate them.
- Long work is broken into `step.run` blocks. A single multi-minute body without steps loses progress on retry and blows the function timeout.
- Event payloads are validated with Zod at function entry (see `zod-at-boundaries.md`). Trusting the shape because "we sent it" is how schema drift becomes a 3am page.
- Errors thrown inside a step trigger Inngest's retry policy. Use the typed error classes in `services/src/utils/errors/` (`AIModelError`, `DatabaseError`, `BrowserAutomationError`) so retryable vs non-retryable failures are distinguishable.
- Do not log full LLM payloads, screenshots, or PII in step output — Inngest stores step results and they become a privacy and cost surface (see `secret-hygiene.md`).
- Test Inngest functions by invoking them through the local Inngest dev server (`npm run inngest`), not by calling the function body directly. The retry/step semantics only exist at the runtime boundary.
- Cancelling or replaying a function in production requires explicit user approval. Do not call `cancel`/`replay` from runtime code without justification.
