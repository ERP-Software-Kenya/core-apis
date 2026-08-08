import { ApiProperty } from "@nestjs/swagger";
import { CityResponse } from "./city.response";

export class CitiesPagedResponse {
  @ApiProperty({ type: [CityResponse] }) public items: CityResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
