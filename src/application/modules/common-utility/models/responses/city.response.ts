import { AutoMap } from "@automapper/classes";

export class CityResponse {
  @AutoMap() public id: number;
  @AutoMap() public name: string;
  
  @AutoMap() public stateId: number;
  @AutoMap() public stateCode: string;
  @AutoMap() public countryId: number;
  @AutoMap() public countryCode: string;
  @AutoMap() public latitude?: number;
  @AutoMap() public longitude?: number;
  
}
