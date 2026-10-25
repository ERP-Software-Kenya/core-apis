import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Length, MaxLength } from "class-validator";

export class UpsertSessionRequest {
  @ApiProperty()
  @IsString()
  @Length(8, 255)
  public deviceId: string;

  @ApiProperty()
  @IsString()
  @Length(1, 255)
  public deviceName: string;

  @ApiProperty({ example: "windows" })
  @IsString()
  @Length(1, 50)
  public platform: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  public appVersion?: string;
}
