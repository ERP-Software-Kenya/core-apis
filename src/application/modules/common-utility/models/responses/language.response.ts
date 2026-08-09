import { AutoMap } from "@automapper/classes";

export class LanguageResponse {
  @AutoMap() public code: string;
  @AutoMap() public name: string;
  
}
