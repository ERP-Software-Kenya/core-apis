---
description: Back-end Developer rules. Strictly apply when changes in `core-apis` repo.
alwaysApply: true
---

# Core-API — Global AI Rules
This file defines the absolute coding standards for this repository. All AI agents (Cursor, Windsurf, Gemini, Claude, Codex, etc.) MUST strictly adhere to these rules without exception.
## 0. Fundamental Mandate
- **STRICT ENFORCEMENT**: Never deviate from the established architectural patterns. If a request contradicts these rules, flag the contradiction to the user.
- **FILE SEPARATION**: Every time you create a new class, you MUST create a new file. Never put multiple classes in one file.
- **TECHNOLOGY STACK**: NestJS, TypeScript, TypeORM (Postgres), CQRS, AutoMapper, RabbitMQ, NX Monorepo.
---
## 1. Clean Architecture Layers
You MUST maintain strict layer boundaries:
### Application Layer (`application/features/<feature>/`)
- **commands/**: Write operations (mutations).
- **queries/**: Read operations (data fetching).
- **domain/**: Plain TypeScript models. **CRITICAL: ZERO framework imports** (no `@nestjs/*`, no `typeorm`). Use only `@AutoMap()`.
- **models/**: HTTP DTOs (Request/Response). Use `class-validator` and Swagger decorators.
- **events/**: RabbitMQ event classes.
- **exceptions/**: Custom domain exceptions (extending `Rpc*Exception`).
- **helpers/**: AutoMapper profiles and filter normalizers.
- **repositories/**: INTERFACES ONLY (e.g., `i-user.repo.ts`).
- **services/**: INTERFACES ONLY.
- **options/**: Feature configuration classes.
### Infrastructure Layer (`infrastructure/`)
- Contains IMPLEMENTATIONS of repositories and services (TypeORM, S3, etc.).
- Database entities and migrations live in `infrastructure/persistence/`.
### Configuration Layer (`configuration/`)
- Typed config interfaces and factories.
---
## 2. CQRS Implementation Rules
### Commands & Queries
- **Commands**: Must extend `CommandBase`. Handlers must use `@CommandHandlerStrict(CommandClass)`.
- **Queries**: Must extend `QueryBase`. Handlers must use `@QueryHandlerStrict(QueryClass)`.
- **Logging**: Always log at the start of `execute()`: `this.logger.info("Executing [Command/Query] 'ClassName'")`.
- **Dispatching**: ALWAYS use `CqrsMediator.execute<TCommand, TResult>(command)`. NEVER use NestJS `CommandBus` or `QueryBus` directly.
---
## 3. Naming Conventions (Strict Kebab-Case)
| Artifact | File Suffix | Class Name |
| :--- | :--- | :--- |
| Command | `.command.ts` | `[Action]Command` |
| Command Handler | `.command-handler.ts` | `[Action]CommandHandler` |
| Query | `.query.ts` | `[Action]Query` |
| Query Handler | `.query-handler.ts` | `[Action]QueryHandler` |
| Repository Interface | `i-[name].repo.ts` | `I[Name]Repo` |
| Service Interface | `i-[name].service.ts` | `I[Name]Service` |
| Exception | `[name]-not-found.exception.ts` | `[Name]NotFoundException` |
| Mapper Profile | `[name].mapper.ts` | `[Name]Mapper` |
| DTO (Request) | `[action].request.ts` | `[Action]Request` |
| DTO (Response) | `[name].response.ts` | `[Name]Response` |
| Enum | `e-[name].ts` | `E[Name]` |
| NestJS Module | `[name].module.ts` | `[Name]Module` |
| NestJS Controller | `[name].controller.ts` | `[Name]Controller` |
---
## 4. Dependency Injection & Tokens
- **Tokens**: Define string injection tokens in the same file as the interface.
- **Naming**: `export const FOO_REPO = 'IFooRepo';` (SCREAMING_SNAKE_CASE).
- **Injection**: ALWAYS use `@Inject(TOKEN)`. NEVER inject a class directly if an interface exists.
---
## 5. AutoMapper & Data Handling
- **Decorators**: Add `@AutoMap()` to every property in Commands, Queries, Domain Models, and DTOs.
- **Enums**: Use `@AutoMap(() => String)` for enum properties.
- **Profiles**: Profiles must extend `AutomapperProfile`. Register in the feature's module.
---
## 6. Controller Standards
- **Base Class**: Every controller extends `BaseController`.
- **Versioning**: Use URI versioning (e.g., `version: '1'`).
- **Pathing**: `EUserType.[Type] + '/[resource]'`.
- **Security**: Always apply guards: `ThrottlerGuard, Authentication, Authorization, UserTypeGuard, RolesGuard`.
- **Swagger**: Decorate every endpoint with `@ApiOperation`, `@ApiOkResponse`, and `@HttpCode`.
- **Return Type**: Always return a typed Response DTO.
---
## 7. Database & Repositories
- **Base Repo**: `IBaseRepo<T, ID>` provides standard async methods.
- **Naming**: Async operations must have the `Async` suffix (e.g., `getAsync`).
- **TypeORM**: Use `snake_case` for database columns.
---
## 8. TypeScript & Quality
- **Visibility**: Explicitly use `public`, `private`, or `protected` on all class members.
- **Immutability**: Prefer `readonly` for dependencies.
- **No Any**: Use explicit types or generics.
- **Utilities**: Use `common` for common checks (e.g., `isNilOrEmpty`).
- **Barrels**: Use `index.ts` in every sub-folder for clean exports. Import from barrels, not deep paths.
- **Types**: Don't use `any` or `unknown`. Use `unknown` for unknown types. Always create types if not exist.
## 9. Executor Standards
- **Base Class**: Every executor extends `EventBaseExecutor`.
- **Remember**: When create new method in executor, map event and command or query in mapper files. 
```