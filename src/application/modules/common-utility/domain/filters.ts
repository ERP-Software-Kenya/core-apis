import { AutoMap } from '@automapper/classes';

export class CountryFilter { @AutoMap() public name?: string; }
export class StateFilter { @AutoMap() public name?: string; @AutoMap() public countryId?: number; }
export class CityFilter { @AutoMap() public name?: string; @AutoMap() public stateId?: number; }
export class CurrencyFilter { @AutoMap() public name?: string; }
export class LanguageFilter { @AutoMap() public name?: string; }
