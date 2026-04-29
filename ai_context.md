# AI Context — core-apis

> This document is consumed by AI coding assistants (Antigravity, Cursor, etc.) to understand
> the architecture, conventions, and development standards for the **core-apis** project.
> Reference implementation: `apps/vault-ms`.

---

## 1. Project Overview

`core-apis` is a standalone NestJS backend API gateway/monolith that manages all business
operations for the platform. Unlike `vault-ms` (which pulled shared utilities from an Nx
library), **core-apis houses all common utilities, base classes, and infrastructure adapters
inside its own `src/common/` folder**.

### Key Differences vs vault-ms

| Concern | vault-ms | core-apis |
|---|---|---|
| Lib source | `@bit-core-api/shared-base-lib` (Nx lib) | `src/common/` (internal) |
| Feature grouping | `application/features/` | `application/modules/` |
| Entry module | `VaultModule` | `AppModule` (root) |
| Config shape | `IVaultMsConfig` | `ICoreApiConfig` |

---

## 2. Folder Structure

```
core-apis/
└── src/
    ├── main.ts                          # Bootstrap (Swagger, Versioning, GlobalPipes)
    ├── app.module.ts                     # Root dynamic module (forRoot pattern)
    ├── common/                           # ← replaces @bit-core-api/shared-base-lib
    │   ├── db/                           # Base repo, base seed, TypeORM helpers
    │   │   ├── base-read-only.repo.ts
    │   │   ├── base.repo.ts
    │   │   ├── base.seed.ts
    │   │   ├── db-exception.ts
    │   │   ├── e-filter-operation.ts
    │   │   ├── i-base.repo.ts
    │   │   ├── i-immutable.repo.ts
    │   │   ├── i-read-only.repo.ts
    │   │   ├── i-seed.ts
    │   │   ├── i-transactional.ts
    │   │   ├── options/                  # IDbOptions
    │   │   ├── types/                    # ISeedEntity, etc.
    │   │   └── index.ts
    │   ├── filtering/                    # Filter, PageableFilter, IPageable
    │   ├── exceptions/                   # Base exceptions (RpcNotImplemented, ArgNil, etc.)
    │   ├── health/                       # HealthController, HealthCheckController
    │   └── index.ts
    ├── configuration/
    │   ├── config.factory.ts             # Main config factory (env → ICoreApiConfig)
    │   ├── i-api.options.ts
    │   ├── i-core-api.config.ts
    │   └── index.ts
    ├── application/
    │   ├── application.module.ts         # DynamicModule — imports all modules[], controllers[]
    │   ├── constants.ts                  # Token strings (REPO names, SERVICE names)
    │   ├── index.ts
    │   └── modules/                      # ← business features (one folder per domain)
    │       ├── auth/
    │       ├── users/
    │       ├── organizations/
    │       ├── products/
    │       ├── inventory/
    │       ├── stores/
    │       ├── suppliers/
    │       ├── purchases/
    │       └── sales/
    └── infrastructure/
        ├── infrastructure.module.ts      # DynamicModule — TypeORM, repositories, seeds, services
        ├── index.ts
        └── persistence/
            ├── entities/                 # TypeORM @Entity classes (snake_case via SnakeNamingStrategy)
            ├── repositories/            # Concrete repos extending BaseRepo
            ├── mappers/                 # AutoMapper profiles (EntityMapperProfile)
            ├── migrations/              # TypeORM migrations (timestamp-migration.ts)
            ├── seeds/                   # Seed classes extending BaseSeed + SeedingService
            ├── options/                 # IDbOptions
            └── type-orm.config.ts       # DataSource for CLI + generateDataSourceOptions()
```

---

## 3. Module Architecture

### Root Module (`app.module.ts`)

Mirrors `vault.module.ts` — **single dynamic module** with `forRoot()`:

```typescript
@Module({})
export class AppModule {
  public static forRoot(): DynamicModule {
    return {
      global: true,
      module: AppModule,
      imports: [
        ConfigModule.forRoot({ load: [configFactory], isGlobal: true }),
        LoggerModule.forRootAsync(/* nestjs-pino */),
        SentryModule.forRootAsync(/* @ntegral/nestjs-sentry */),
        AutomapperModule.forRoot({ strategyInitializer: classes() }),
        ThrottlerModule.forRoot([{ ttl, limit }]),
        ApplicationModule.forRoot(),
        InfrastructureModule.forRoot(),
      ],
      providers: [ /* JWT, Redis, option-class providers */ ],
      exports: [ /* all shared providers */ ],
    };
  }
}
```

### Application Module (`application/application.module.ts`)

- Imports `CqrsModule`, `TerminusModule`
- Registers all module `Controllers`, `QueryHandlers`, `CommandHandlers`, `MappingProfiles`
- Each domain module (auth, users, etc.) is imported here

### Infrastructure Module (`infrastructure/infrastructure.module.ts`)

- Imports `TypeOrmModule.forRootAsync()` using `generateDataSourceOptions`
- Registers all repository providers using injection tokens from `constants.ts`
- Registers `SeedingService` and all individual seeds
- Registers `EntityMapperProfile`

---

## 4. Per-Module Structure (inside `application/modules/<domain>/`)

Each domain module follows this structure (same as vault-ms `features/sde/`):

```
<domain>/
├── <domain>.module.ts          # Standard @Module (imported by ApplicationModule)
├── <domain>.controller.ts      # REST controller with Swagger decorators
├── commands/
│   ├── create-<domain>.command.ts
│   ├── create-<domain>.handler.ts
│   └── index.ts
├── queries/
│   ├── get-<domain>.query.ts
│   ├── get-<domain>.handler.ts
│   └── index.ts
├── domain/                     # Domain models (plain classes with @AutoMap())
│   └── <domain>.model.ts
├── models/                     # Request/Response DTOs (ApiProperty, IsString, etc.)
│   ├── requests/
│   └── responses/
├── repositories/               # Repository interfaces (I<Domain>Repo)
│   └── i-<domain>.repo.ts
└── exceptions/
    └── <domain>-not-found.exception.ts
```

---

## 5. Common Folder (`src/common/`)

This folder replaces `@bit-core-api/shared-base-lib`. All classes are imported via relative
paths or a path alias (`@common/*`).

### `common/db/` — Base Repository Layer

| Class | Description |
|---|---|
| `BaseReadOnlyRepo<TEntity, T, TKey>` | `getAsync`, `allAsync`, `pagedAsync`, `findOneAsync`, `countAsync`, `existAsync` |
| `BaseRepo<TEntity, T, TKey>` | Extends `BaseReadOnlyRepo` + `createAsync`, `updateAsync`, `deleteAsync` |
| `BaseSeed<TEntity>` | Versioned seed runner — `runAsync()`, `writeDataAsync()`, `loadSeedEntityAsync()` |
| `DbException` | Wraps TypeORM errors |
| `EFilterOperation` | Enum for `Like`, `ILike`, `Between`, `In`, `Less`, `More`, etc. |

Concrete repositories extend `BaseRepo` and inject:
- `@InjectRepository(Entity)` → TypeORM Repository
- `@InjectMapper()` → AutoMapper Mapper
- `@InjectPinoLogger(RepoName)` → PinoLogger

### `common/filtering/` — Pagination & Filtering

```typescript
interface IPageable<T> { items: T[]; page: number; perPage: number; totalCount: number; totalPages: number; }
class Filter<T, TKey> { $ids?: TKey[]; $order?: 'ASC'|'DESC'; $orderBy?: keyof T; ... }
class PageableFilter<T, TKey> extends Filter<T, TKey> { $page: number; $perPage: number; }
```

---

## 6. Configuration (`src/configuration/`)

### `ICoreApiConfig` interface

```typescript
interface ICoreApiConfig {
  logger: Params;          // nestjs-pino
  sentry: SentryModuleOptions;
  api: IApiOptions;        // { host, port, env, domain, globalPrefix }
  database: IDbOptions;    // { host, port, username, password, database, sslEnable, sslCert }
  auth: IJwtAuthOptions;
  redis?: RedisOptions;    // optional – only if Redis needed
}
```

### `configFactory()`

Single function loaded via `ConfigModule.forRoot({ load: [configFactory] })`. Reads `process.env`
and returns a fully typed `ICoreApiConfig` object.

### Environment Variables

```env
# API
NODE_ENV=development
API_HOST=0.0.0.0
API_PORT=3000
API_DOMAIN=http://localhost:3000
GLOBAL_PREFIX=api

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=core_db
DB_SSL=false
DB_SSL_CA=

# Sentry
SENTRY_DSN=
SENTRY_ENV=development

# JWT
JWT_SECRET=
JWT_AUDIENCE=
JWT_ISSUER=
```

---

## 7. TypeORM / Database Conventions

### Entity conventions

- All entities live in `infrastructure/persistence/entities/`
- Use `SnakeNamingStrategy` from `typeorm-naming-strategies`
- Define a schema enum file (`e-<project>-table-name.ts`) with table name constants
- `@AutoMap()` on every mapped column
- PK: `@PrimaryGeneratedColumn('uuid')`, with explicit constraint name `PK_<TableName>`
- FK: `@JoinColumn` with explicit `foreignKeyConstraintName`

### Migration conventions

- File: `<timestamp>-migration.ts`
- Class: `Migration<timestamp>` implementing `MigrationInterface`
- Always pair `up()` / `down()` with inverse raw SQL
- CLI config: export `default new DataSource(generateDataSourceOptions())` from `type-orm.config.ts`
- npm script: `"migration:run": "typeorm migration:run -d src/infrastructure/persistence/type-orm.config.ts"`
- npm script: `"migration:generate": "typeorm migration:generate -d src/infrastructure/persistence/type-orm.config.ts"`
- npm script: `"migration:revert": "typeorm migration:revert -d src/infrastructure/persistence/type-orm.config.ts"`
- npm script: `"seed": "ts-node -r tsconfig-paths/register src/main.ts --seed-only"`

### Seeds conventions

- Extend `BaseSeed<TEntity>` from `common/db/`
- Must implement: `version` (integer), `seedingData` (array), `equalityCheck()`, `createFilter()`
- `SeedingService` calls `.runAsync()` on each seed in order
- Version is stored in `public.seeds` table — runs are idempotent

### Repository conventions

- Extend `BaseRepo<Entity, DomainModel, PKType>` (or `BaseReadOnlyRepo` for read-only)
- Inject via token: `{ provide: TOKEN, useClass: ConcreteRepo }`
- Tokens defined in `application/constants.ts`
- Interface defined in the domain module's `repositories/i-<domain>.repo.ts`

---

## 8. AutoMapper Conventions

- `AutomapperModule.forRoot({ strategyInitializer: classes() })` in root module
- `@AutoMap()` decorator on entity and domain model properties
- All mappings registered in `EntityMapperProfile extends AutomapperProfile`
- Profile added to `InfrastructureModule` providers and exports
- Use `@InjectMapper()` in repos; `mapper.map(entity, EntityClass, DomainClass)`

---

## 9. CQRS Conventions

- Commands: `<Verb><Domain>Command` + `<Verb><Domain>CommandHandler` (implements `ICommandHandler`)
- Queries: `Get<Domain>Query` + `Get<Domain>QueryHandler` (implements `IQueryHandler`)
- All handlers exported in `features/index.ts` as `CommandHandlers[]` and `QueryHandlers[]`
- `ApplicationModule` spreads both arrays into `providers`

---

## 10. main.ts Bootstrap Pattern

```typescript
async function bootstrap(): Promise<void> {
  // 1. Run seeds via temporary context
  const ctx = await NestFactory.createApplicationContext(AppModule.forRoot());
  const seeds = ctx.get<SeedingService>(SeedingService);
  await seeds.runAsync();
  await ctx.close();

  // 2. Create HTTP app
  const app = await NestFactory.create(AppModule.forRoot());
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  addSwagger(app, globalPrefix);
  await app.listen(port, host);
}
```

---

## 11. Sentry Configuration

- Package: `@ntegral/nestjs-sentry`
- Registered in root module via `SentryModule.forRootAsync()`
- Config returned from `configFactory()` under `sentry` key
- DSN from `SENTRY_DSN` env var

---

## 12. Swagger / API Documentation

- `DocumentBuilder` in `main.ts` — `addBearerAuth`, `addApiKey`
- Version from `npm_package_version`
- URL: `<globalPrefix>/docs`
- All request DTOs use `@ApiProperty()` from `@nestjs/swagger`

---

## 13. Injection Token Naming

All DI tokens are string constants defined in `application/constants.ts`:

```typescript
export const USER_REPO = 'USER_REPO';
export const AUTH_REPO = 'AUTH_REPO';
export const USER_SERVICE = 'USER_SERVICE';
// pattern: <ENTITY>_REPO, <SERVICE_NAME>_SERVICE
```

---

## 14. Logging

- `nestjs-pino` + `pino-http`
- `LoggerModule.forRootAsync()` in root module
- Use `@InjectPinoLogger(ClassName.name)` in services/repos/seeds
- Config: `generateLoggerConfig()` (can be adapted from vault-ms version)

---

## 15. Checklist When Adding a New Module

1. Create `src/application/modules/<domain>/` with the structure in §4
2. Add entity to `infrastructure/persistence/entities/`
3. Add entity to the `Entities` array exported from `entities/index.ts`
4. Create repo class + interface, add token to `constants.ts`
5. Add mapper mapping in `EntityMapperProfile`
6. Register repo in `InfrastructureModule` providers/exports
7. Add module + handlers + controller to `ApplicationModule`
8. Generate migration: `npm run migration:generate -- src/infrastructure/persistence/migrations/<name>`
9. Create seed if needed, add to `SeedingService`

---

*Last updated: 2026-04-29 — derived from vault-ms reference implementation.*
