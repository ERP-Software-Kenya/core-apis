import { AutoMap } from '@automapper/classes';

export class Country {
  @AutoMap() public id: number;
  @AutoMap() public name: string;
  @AutoMap() public iso3: string;
  @AutoMap() public iso2: string;
  @AutoMap() public phoneCode?: string;
  @AutoMap() public currency?: string;
  @AutoMap() public currencySymbol?: string;
  @AutoMap() public native?: string;
  @AutoMap() public region?: string;
  @AutoMap() public latitude?: number;
  @AutoMap() public longitude?: number;
}
