# Zod at Boundaries

External data crosses into the codebase through a Zod schema. Internal-only data uses plain TypeScript types.

External, in scope:
- HTTP request bodies and query params (Express controllers, Next.js route handlers)
- LLM/agent outputs — every structured response from OpenAI/LangGraph agents validates against a schema in `services/src/schemas/`
- Hasura GraphQL responses where the generated type cannot be trusted (e.g. `jsonb` columns, untyped relations)
- Environment variables — `services/src/env.ts` is the canonical pattern. Do not read `process.env.X` ad hoc.
- Inngest event payloads, webhook bodies, Liveblocks room data, MinIO object metadata.
- File contents, scraped HTML, screenshots metadata, anything from `extension/`.

Internal, out of scope:
- Function arguments and return types between modules in the same package — TS types are sufficient.
- Generated GraphQL types from codegen for fully-typed columns.

Banned:
- `any`. No exceptions.
- `as unknown as T`. If you need this, you are missing a Zod parse.
- `// @ts-ignore` and `// @ts-expect-error` without an inline reason explaining what was tried first.
- Reading `process.env.X` outside the env module.
- Returning unparsed external data from a function — parse at the boundary, not at the caller.

When the LLM returns malformed output, the schema fail is the correct outcome. Surface it via `AIModelError`, do not patch the schema to accept the malformed shape.
