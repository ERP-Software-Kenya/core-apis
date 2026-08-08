// Standard barrel file
export * from './categories.seed';
export * from './default-organization.seed';
export * from './inventory.seed';
export * from './products.seed';
export * from './purchase-orders.seed';
export * from './roles.seed';
export * from './seeding.service';
export * from './suppliers.seed';
export * from './ref-countries.seed';
export * from './ref-states.seed';
export * from './ref-cities.seed';
export * from './ref-currencies.seed';
export * from './ref-languages.seed';
export * from './vehicle-types.seed';
export * from './vehicle-brands.seed';
export * from './fuel-types.seed';
export * from './maintenance-types.seed';

import { SeedingService } from "./seeding.service";
import { RolesSeed } from "./roles.seed";
import { RefCountriesSeed } from './ref-countries.seed';
import { RefStatesSeed } from './ref-states.seed';
import { RefCitiesSeed } from './ref-cities.seed';
import { RefCurrenciesSeed } from './ref-currencies.seed';
import { RefLanguagesSeed } from './ref-languages.seed';
import { VehicleTypesSeed } from './vehicle-types.seed';
import { VehicleBrandsSeed } from './vehicle-brands.seed';
import { FuelTypesSeed } from './fuel-types.seed';
import { MaintenanceTypesSeed } from './maintenance-types.seed';

export default [
  SeedingService,
  RolesSeed,
  RefCountriesSeed,
  RefStatesSeed,
  RefCitiesSeed,
  RefCurrenciesSeed,
  RefLanguagesSeed,
  VehicleTypesSeed,
  VehicleBrandsSeed,
  FuelTypesSeed,
  MaintenanceTypesSeed,
];
