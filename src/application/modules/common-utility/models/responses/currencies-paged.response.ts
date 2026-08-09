import { ApiProperty } from "@nestjs/swagger";
import { CurrencyResponse } from "./currency.response";

export class CurrenciesPagedResponse {
  @ApiProperty({ type: [CurrencyResponse] }) public items: CurrencyResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
