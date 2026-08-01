import { AutoMap } from '@automapper/classes';

export class State {
  @AutoMap() public id: number;
  @AutoMap() public name: string;
  @AutoMap() public countryId: number;
  @AutoMap() public countryCode?: string;
  @AutoMap() public fipsCode?: string;
  @AutoMap() public iso2?: string;
  @AutoMap() public latitude?: number;
  @AutoMap() public longitude?: number;
}
