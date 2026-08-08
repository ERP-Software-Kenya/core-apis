# Vehicle & Transportation Management — Module Context

**Branch:** `feat/vehicle-and-transportation-management`
**Base:** `develop`
**Last updated:** 2026-08-08

---

## Overview

Six NestJS modules handle the full vehicle and transportation lifecycle:

| Module | Base path | Responsibility |
|---|---|---|
| Vehicles | `/api/v1/vehicles` | Fleet master data |
| Drivers | `/api/v1/drivers` | Driver registry |
| Trips | `/api/v1/trips` | Trip dispatch & tracking |
| Maintenance | `/api/v1/maintenance` | Service records |
| Vehicle Expenses | `/api/v1/vehicle-expenses` | Cost tracking per vehicle |
| Analytics | `/api/v1/analytics` | Aggregated fleet & financial KPIs |

All modules are registered in `src/application/application.module.ts` and follow the project-wide Clean Architecture + CQRS pattern.

---

## Architecture Conventions (applied throughout)

- **Commands** extend `CommandBase`; handlers use `@CommandHandlerStrict`.
- **Queries** extend `QueryBase`; handlers use `@QueryHandlerStrict`.
- **Dispatch** always via `CqrsMediator.execute<TCommand, TResult>(command)` — `CommandBus` / `QueryBus` are never used directly.
- **AutoMapper** flat `@AutoMap()` fields on every command, query, domain model, and DTO. No request-wrapper constructors.
- **Auth** every controller carries `@UseGuards(ClerkAuthGuard)`.
- **Org scoping** `organizationId` (or `companyId` on vehicles) is always taken from `@CurrentUser()` — never from the request body. Controllers set it after mapping: `command.organizationId = user?.organizationId ?? FALLBACK_ORG_ID`.
- **Imports** use baseUrl-relative paths: `src/common`, `src/application/constants`, `src/application/shared`.

---

## Module 1 — Vehicles

### NestJS module
`src/application/modules/vehicles/vehicles.module.ts`

### Endpoints

| Method | Path | Handler | Description |
|---|---|---|---|
| `GET` | `/api/v1/vehicles` | `search()` | Paginated vehicle search |
| `GET` | `/api/v1/vehicles/list` | `list()` | Flat list (no pagination) |
| `GET` | `/api/v1/vehicles/:id` | `getById()` | Single vehicle |
| `POST` | `/api/v1/vehicles` | `create()` | Create vehicle — `companyId` from `@CurrentUser()` |
| `PUT` | `/api/v1/vehicles/:id` | `update()` | Update vehicle fields |
| `DELETE` | `/api/v1/vehicles/:id` | `delete()` | Delete vehicle |

### Domain model (`Vehicle`)
`src/application/modules/vehicles/domain/vehicle.ts`

| Field | Type | Notes |
|---|---|---|
| `id` | `string` (UUID) | |
| `vehicleNumber` | `string` | Unique |
| `vinNumber` | `string?` | |
| `registrationNumber` | `string?` | |
| `companyId` | `string` (UUID) | FK → Organization; set from token |
| `vehicleTypeId` | `string` (UUID) | FK → VehicleType ref table |
| `brandId` | `string` (UUID) | FK → VehicleBrand ref table |
| `model` | `string?` | |
| `manufactureYear` | `number?` | |
| `color` | `string?` | |
| `fuelTypeId` | `string` (UUID) | FK → FuelType ref table |
| `tankCapacity` | `number?` | Litres |
| `payloadCapacity` | `number?` | kg |
| `mileage` | `number?` | |
| `purchaseDate` | `Date?` | |
| `purchasePrice` | `number?` | |
| `insuranceExpiry` | `Date?` | |
| `registrationExpiry` | `Date?` | |
| `status` | `EVehicleStatus` | Default: `Available` |
| `imageUrl` | `string?` | |
| `notes` | `string?` | |

### `EVehicleStatus` enum
`src/application/shared/enums/e-vehicle-status.ts`
Values: `Available`, `InTransit`, `Idle`, `Maintenance`.

### Request DTOs
- `CreateVehicleRequest` — required: `vehicleNumber`, `vehicleTypeId`, `brandId`, `fuelTypeId`; optional: `vinNumber`. `companyId` is injected server-side.
- `UpdateVehicleRequest` — all fields optional.
- `SearchVehiclesRequest` / `ListVehiclesRequest` — filter/pagination params.

### Commands & Queries
| Artifact | File |
|---|---|
| `CreateVehicleCommand` + handler | `commands/create-vehicle/` |
| `UpdateVehicleCommand` + handler | `commands/update-vehicle/` |
| `DeleteVehicleCommand` + handler | `commands/delete-vehicle/` |
| `GetVehicleQuery` + handler | `queries/get-vehicle/` |
| `SearchVehiclesQuery` + handler | `queries/search-vehicles/` |
| `ListVehiclesQuery` + handler | `queries/list-vehicles/` |

### Mapper profile
`src/application/modules/vehicles/mapper/vehicle.mapper-profile.ts`
Registered pairs: `CreateVehicleRequest→CreateVehicleCommand`, `CreateVehicleCommand→Vehicle`, `UpdateVehicleRequest→UpdateVehicleCommand`, `UpdateVehicleCommand→Vehicle`, `SearchVehiclesRequest→SearchVehiclesQuery`, `ListVehiclesRequest→ListVehiclesQuery`, `Vehicle→VehicleResponse`.

### Infrastructure
- Entity: `src/infrastructure/persistence/entities/vehicle.entity.ts`
- Repo interface: `src/application/modules/vehicles/repositories/i-vehicle.repo.ts` — token `VEHICLE_REPO`
- Repo implementation: `src/infrastructure/persistence/repositories/vehicle.repo.ts`

---

## Module 2 — Drivers

### NestJS module
`src/application/modules/drivers/drivers.module.ts`

### Endpoints

| Method | Path | Handler | Description |
|---|---|---|---|
| `GET` | `/api/v1/drivers` | `search()` | Paginated driver search |
| `GET` | `/api/v1/drivers/list` | `list()` | Flat list |
| `GET` | `/api/v1/drivers/:id` | `getById()` | Single driver |
| `POST` | `/api/v1/drivers` | `create()` | Create driver — `organizationId` from `@CurrentUser()` |
| `PUT` | `/api/v1/drivers/:id` | `update()` | Update driver fields |
| `DELETE` | `/api/v1/drivers/:id` | `delete()` | Delete driver |

### Domain model (`Driver`)
`src/application/modules/drivers/domain/driver.ts`

| Field | Type | Notes |
|---|---|---|
| `id` | `string` (UUID) | |
| `organizationId` | `string` (UUID) | Set from token |
| `employeeId` | `string?` | Internal HR ID |
| `firstName` | `string` | |
| `lastName` | `string` | |
| `phone` | `string` | |
| `email` | `string?` | |
| `licenseNumber` | `string` | Unique |
| `licenseType` | `string?` | e.g. Class B, Class C |
| `licenseExpiry` | `Date?` | |
| `joiningDate` | `Date?` | |
| `experienceYears` | `number?` | |
| `bloodGroup` | `string?` | |
| `address` | `string?` | |
| `emergencyContact` | `string?` | |
| `status` | `EDriverStatus` | Default: `Active` |
| `profileImage` | `string?` | URL |

### `EDriverStatus` enum
`src/application/shared/enums/e-driver-status.ts`

### Request DTOs
- `CreateDriverRequest` — required: `firstName`, `lastName`, `phone`, `licenseNumber`; optional: `email`, `licenseType`, `employeeId`. `organizationId` injected server-side.
- `UpdateDriverRequest` — all fields optional.

### Commands & Queries
| Artifact | File |
|---|---|
| `CreateDriverCommand` + handler | `commands/create-driver/` |
| `UpdateDriverCommand` + handler | `commands/update-driver/` |
| `DeleteDriverCommand` + handler | `commands/delete-driver/` |
| `GetDriverQuery` + handler | `queries/get-driver/` |
| `SearchDriversQuery` + handler | `queries/search-drivers/` |
| `ListDriversQuery` + handler | `queries/list-drivers/` |

### Infrastructure
- Entity: `src/infrastructure/persistence/entities/driver.entity.ts`
- Repo interface: `src/application/modules/drivers/repositories/i-driver.repo.ts` — token `DRIVER_REPO`
- Repo implementation: `src/infrastructure/persistence/repositories/driver.repo.ts`

---

## Module 3 — Trips

### NestJS module
`src/application/modules/trips/trips.module.ts`

### Endpoints

| Method | Path | Handler | Description |
|---|---|---|---|
| `GET` | `/api/v1/trips` | `search()` | Paginated trip search |
| `GET` | `/api/v1/trips/list` | `list()` | Flat list |
| `GET` | `/api/v1/trips/:id` | `getById()` | Single trip |
| `POST` | `/api/v1/trips` | `create()` | Create trip — `organizationId` from `@CurrentUser()` |
| `PUT` | `/api/v1/trips/:id` | `update()` | Update trip |
| `DELETE` | `/api/v1/trips/:id` | `delete()` | Delete trip |

### Domain model (`Trip`)
`src/application/modules/trips/domain/trip.model.ts`

| Field | Type | Notes |
|---|---|---|
| `id` | `string` (UUID) | |
| `tripNumber` | `string` | |
| `vehicleId` | `string` (UUID) | FK → Vehicle |
| `driverId` | `string` (UUID) | FK → Driver |
| `customerId` | `string` (UUID) | FK → Customer |
| `pickupLocation` | `string` | |
| `dropLocation` | `string` | |
| `startDatetime` | `Date` | |
| `endDatetime` | `Date?` | |
| `estimatedDistance` | `number?` | km |
| `actualDistance` | `number?` | km |
| `tripStatus` | `ETripStatus` | |
| `priority` | `string` | |

### `ETripStatus` enum
`src/application/shared/enums/e-trip-status.ts`

### Request DTOs
- `CreateTripRequest` — required: `tripNumber`, `vehicleId`, `driverId`, `customerId`, `pickupLocation`, `dropLocation`, `startDatetime`, `priority`; optional: `estimatedDistance`. `organizationId` injected server-side.
- `UpdateTripRequest` — all fields optional.

### Commands & Queries
| Artifact | File |
|---|---|
| `CreateTripCommand` + handler | `commands/create-trip/` |
| `UpdateTripCommand` + handler | `commands/update-trip/` |
| `DeleteTripCommand` + handler | `commands/delete-trip/` |
| `GetTripQuery` + handler | `queries/get-trip/` |
| `SearchTripsQuery` + handler | `queries/search-trips/` |
| `ListTripsQuery` + handler | `queries/list-trips/` |

### Infrastructure
- Entity: `src/infrastructure/persistence/entities/trip.entity.ts`
- Supporting entities: `trip-checkpoint.entity.ts`, `trip-event.entity.ts`, `trip-goods.entity.ts`
- Repo interface: `src/application/modules/trips/repositories/i-trip.repo.ts` — token `TRIP_REPO`
- Repo implementation: `src/infrastructure/persistence/repositories/trip.repo.ts`

---

## Module 4 — Maintenance

### NestJS module
`src/application/modules/maintenance/maintenance.module.ts`

### Endpoints

| Method | Path | Handler | Description |
|---|---|---|---|
| `POST` | `/api/v1/maintenance` | `create()` | Log a maintenance record |

### Domain model (`Maintenance`)
`src/application/modules/maintenance/domain/maintenance.ts`

| Field | Type | Notes |
|---|---|---|
| `id` | `string` (UUID) | |
| `vehicleId` | `string` (UUID) | FK → Vehicle |
| `maintenanceTypeId` | `string` (UUID) | FK → MaintenanceType ref |
| `serviceCenter` | `string` | |
| `description` | `string?` | |
| `cost` | `number` | |
| `serviceDate` | `Date` | |
| `nextServiceDate` | `Date?` | |
| `odometer` | `number?` | km reading |
| `invoiceNumber` | `string?` | |
| `status` | `EMaintenanceStatus` | |
| `createdBy` | `string` | Set from `user.dbUserId ?? user.clerkUserId` |

### `EMaintenanceStatus` enum
`src/application/shared/enums/e-maintenance-status.ts`

### Request DTOs
- `CreateMaintenanceRequest` — required: `vehicleId`, `maintenanceTypeId`, `serviceCenter`, `cost`, `serviceDate`; optional: `status`. `organizationId` and `createdBy` are injected server-side.

### Commands
| Artifact | File |
|---|---|
| `CreateMaintenanceCommand` + handler | `commands/create-maintenance/` |

### Infrastructure
- Entity: `src/infrastructure/persistence/entities/maintenance.entity.ts`
- Supporting entities: `maintenance-part.entity.ts`, `maintenance-type.entity.ts`
- Repo interface: `src/application/modules/maintenance/repositories/i-maintenance.repo.ts` — token `MAINTENANCE_REPO`
- Fuel transaction repo interface: `repositories/i-fuel-transaction.repo.ts` — token `FUEL_TRANSACTION_REPO`

---

## Module 5 — Vehicle Expenses

### NestJS module
`src/application/modules/vehicle-expenses/vehicle-expenses.module.ts`

### Endpoints

| Method | Path | Handler | Description |
|---|---|---|---|
| `GET` | `/api/v1/vehicle-expenses/:id` | `getById()` | Single expense record |
| `POST` | `/api/v1/vehicle-expenses` | `create()` | Log an expense — `organizationId` from `@CurrentUser()` |
| `DELETE` | `/api/v1/vehicle-expenses/:id` | `delete()` | Delete expense |

### Domain model (`VehicleExpense`)
`src/application/modules/vehicle-expenses/domain/vehicle-expense.model.ts`

| Field | Type | Notes |
|---|---|---|
| `id` | `string` (UUID) | |
| `organizationId` | `string` (UUID) | Set from token |
| `vehicleId` | `string` (UUID) | FK → Vehicle |
| `expenseType` | `EExpenseType` | |
| `amount` | `number` | |
| `expenseDate` | `Date` | |
| `description` | `string?` | |
| `tripId` | `string?` (UUID) | Optional link to a trip |

### `EExpenseType` enum
`src/application/shared/enums/e-expense-type.ts`

### Request DTOs
- `CreateVehicleExpenseRequest` — required: `vehicleId`, `expenseType`, `amount`, `expenseDate`; optional: `description`, `tripId`. `organizationId` injected server-side.

### Commands & Queries
| Artifact | File |
|---|---|
| `CreateVehicleExpenseCommand` + handler | `commands/create-vehicle-expense/` |
| `DeleteVehicleExpenseCommand` + handler | `commands/delete-vehicle-expense/` |
| `GetVehicleExpenseQuery` + handler | `queries/get-vehicle-expense/` |

### Infrastructure
- Entity: `src/infrastructure/persistence/entities/vehicle-expense.entity.ts`
- Repo interface: `src/application/modules/vehicle-expenses/repositories/i-vehicle-expense.repo.ts` — token `VEHICLE_EXPENSE_REPO`

---

## Module 6 — Analytics

### NestJS module
`src/application/modules/analytics/analytics.module.ts`

### Endpoints

| Method | Path | Response type | Description |
|---|---|---|---|
| `GET` | `/api/v1/analytics/fleet-summary` | `FleetSummaryResponse` | Live vehicle status breakdown |
| `GET` | `/api/v1/analytics/financials` | `FinancialKpisResponse` | Aggregated cost KPIs |

### Response shapes

**`FleetSummaryResponse`**
```
totalVehicles       number
activeVehicles      number   (Available + InTransit)
inTransitVehicles   number
idleVehicles        number
maintenanceVehicles number
availableVehicles   number
```

**`FinancialKpisResponse`**
```
totalFuelCost         number   (from FuelTransactionRepo)
totalMaintenanceCost  number   (from MaintenanceRepo)
totalExpenses         number   (from VehicleExpenseRepo)
```

### Queries
| Artifact | File |
|---|---|
| `GetFleetSummaryKpisQuery` + handler | `queries/get-fleet-summary/` |
| `GetFinancialKpisQuery` + handler | `queries/get-financial-kpis/` |

The fleet-summary handler calls `vehicleRepo.allAsync()` and groups by `EVehicleStatus`.
The financial-kpis handler calls `fuelTransactionRepo.allAsync()`, `maintenanceRepo.allAsync()`, and `vehicleExpenseRepo.allAsync()` then sums costs.

---

## Injection tokens (all in `src/application/constants.ts`)

| Token | Value | Used by |
|---|---|---|
| `VEHICLE_REPO` | `'IVehicleRepo'` | Vehicles, Analytics (fleet) |
| `DRIVER_REPO` | `'IDriverRepo'` | Drivers |
| `TRIP_REPO` | `'ITripRepo'` | Trips |
| `MAINTENANCE_REPO` | `'IMaintenanceRepo'` | Maintenance, Analytics (financials) |
| `FUEL_TRANSACTION_REPO` | `'IFuelTransactionRepo'` | Analytics (financials) |
| `VEHICLE_EXPENSE_REPO` | `'IVehicleExpenseRepo'` | Vehicle Expenses, Analytics (financials) |

All tokens are registered in `src/infrastructure/infrastructure.module.ts`.

---

## Shared enums (`src/application/shared/enums/`)

| Enum file | Values |
|---|---|
| `e-vehicle-status.ts` | `Available`, `InTransit`, `Idle`, `Maintenance` |
| `e-driver-status.ts` | `Active`, `Inactive`, `Suspended` |
| `e-trip-status.ts` | `Pending`, `InProgress`, `Completed`, `Cancelled` |
| `e-maintenance-status.ts` | `Scheduled`, `InProgress`, `Completed` |
| `e-expense-type.ts` | `Fuel`, `Toll`, `Repair`, `Insurance`, `Other` |
| `e-trip-event-type.ts` | Trip lifecycle events |

---

## Auth pattern (applied in every controller)

```typescript
const FALLBACK_ORG_ID = '00000000-0000-4000-8000-000000000001';

@UseGuards(ClerkAuthGuard)
@Controller({ path: 'resource', version: '1' })
export class SomeController {
  @Post()
  public async create(@Body() body: CreateRequest, @CurrentUser() user?: AuthenticatedUser) {
    const command = this.mapper.map(body, CreateRequest, CreateCommand);
    command.organizationId = user?.organizationId ?? FALLBACK_ORG_ID;
    // for maintenance only: command.createdBy = user?.dbUserId ?? user?.clerkUserId;
    return this.mediator.execute<CreateCommand, DomainModel>(command);
  }
}
```

`organizationId` / `companyId` is **never** accepted from the HTTP body — it is always resolved from the Clerk JWT via `@CurrentUser()`.

---

## Key FK relationships

```
Organization ──< Vehicle        (companyId)
Organization ──< Driver         (organizationId)
Vehicle      ──< Trip           (vehicleId)
Driver       ──< Trip           (driverId)
Vehicle      ──< Maintenance    (vehicleId)
Vehicle      ──< VehicleExpense (vehicleId)
Trip         ──< VehicleExpense (tripId, optional)
VehicleType  ──< Vehicle        (vehicleTypeId)
VehicleBrand ──< Vehicle        (brandId)
FuelType     ──< Vehicle        (fuelTypeId)
MaintenanceType ──< Maintenance (maintenanceTypeId)
```

---

## Infrastructure repo implementations

All live under `src/infrastructure/persistence/repositories/`:

| File | Extends |
|---|---|
| `vehicle.repo.ts` | `BaseRepo<VehicleEntity, Vehicle, …>` |
| `driver.repo.ts` | `BaseRepo<DriverEntity, Driver, …>` |
| `trip.repo.ts` | `BaseRepo<TripEntity, Trip, …>` |
| `maintenance.repo.ts` | `BaseRepo<MaintenanceEntity, Maintenance, …>` |
| `vehicle-expense.repo.ts` | `BaseRepo<VehicleExpenseEntity, VehicleExpense, …>` |

All override `get idColumnName()` returning `'id'`.
