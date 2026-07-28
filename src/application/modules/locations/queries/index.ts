import { GetLocationQueryHandler } from './get-location';
import { ListLocationsQueryHandler } from './list-locations';
import { SearchLocationsQueryHandler } from './search-locations';

export * from './get-location';
export * from './list-locations';
export * from './search-locations';

export const LocationQueryHandlers = [
  GetLocationQueryHandler,
  ListLocationsQueryHandler,
  SearchLocationsQueryHandler,
];
