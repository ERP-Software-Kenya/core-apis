import { ApiProperty } from "@nestjs/swagger";
import { CountryResponse } from "./country.response";

export class CountriesPagedResponse {
  @ApiProperty({ type: [CountryResponse] }) public items: CountryResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
