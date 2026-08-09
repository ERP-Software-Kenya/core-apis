import { ApiProperty } from "@nestjs/swagger";
import { LanguageResponse } from "./language.response";

export class LanguagesPagedResponse {
  @ApiProperty({ type: [LanguageResponse] }) public items: LanguageResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
