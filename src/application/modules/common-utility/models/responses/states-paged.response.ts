import { ApiProperty } from "@nestjs/swagger";
import { StateResponse } from "./state.response";

export class StatesPagedResponse {
  @ApiProperty({ type: [StateResponse] }) public items: StateResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
