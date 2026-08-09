import { GetVehicleHandler } from './get-vehicle';
import { SearchVehiclesHandler } from './search-vehicles';
import { ListVehiclesHandler } from './list-vehicles';
import { ListVehicleTypesQueryHandler } from './list-vehicle-types';
import { ListVehicleBrandsQueryHandler } from './list-vehicle-brands';
import { ListFuelTypesQueryHandler } from './list-fuel-types';

export * from './get-vehicle/get-vehicle.query';
export * from './search-vehicles/search-vehicles.query';
export * from './list-vehicles/list-vehicles.query';
export * from './list-vehicle-types';
export * from './list-vehicle-brands';
export * from './list-fuel-types';

export const VehicleQueryHandlers = [
  GetVehicleHandler,
  SearchVehiclesHandler,
  ListVehiclesHandler,
  ListVehicleTypesQueryHandler,
  ListVehicleBrandsQueryHandler,
  ListFuelTypesQueryHandler,
];
