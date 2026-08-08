import { GetVehicleHandler } from './get-vehicle';
import { SearchVehiclesHandler } from './search-vehicles';
import { ListVehiclesHandler } from './list-vehicles';

export * from './get-vehicle/get-vehicle.query';
export * from './search-vehicles/search-vehicles.query';
export * from './list-vehicles/list-vehicles.query';

export const VehicleQueryHandlers = [GetVehicleHandler, SearchVehiclesHandler, ListVehiclesHandler];
