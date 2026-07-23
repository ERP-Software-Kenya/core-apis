# Hasura Migration Discipline

Hasura is the single source of truth for the database schema, GraphQL surface, and row-level permissions. Schema and permission changes flow through Hasura migrations, not through code patches that work around them.

Rules:

- Schema change → create a Hasura migration. Migrations live with the Hasura config in `app/hasura/` (or wherever the project's migration directory is configured). Do not edit a previously-applied migration; create a new one.
- After applying a migration, regenerate types in both packages: `cd app && npm run codegen && cd ../services && npm run codegen`. Commit the schema change, the migration, and the regenerated `gql/*.ts` files in the same PR.
- Test migrations locally against a fresh database before applying to staging. Migrations that pass on a populated dev DB but fail on a fresh one are a recurring footgun.
- Down migrations exist for rollback. Skipping the down side is acceptable only when explicitly justified (irreversible data transform); justify in the PR body.
- Production data backfills are a separate concern from schema migrations. Do not mix DDL and large data writes in the same migration.

If you need to query Postgres directly to debug, do so through Hasura SQL console with a read-only role. Never connect runtime services to Postgres bypassing Hasura.
