import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EUserSessionStatus } from "../../../../../infrastructure/persistence/entities";

export class UserSessionResponse {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public deviceId: string;

  @ApiProperty()
  public deviceName: string;

  @ApiProperty()
  public platform: string;

  @ApiPropertyOptional()
  public appVersion?: string;

  @ApiPropertyOptional()
  public ipAddress?: string;

  @ApiProperty({ enum: EUserSessionStatus })
  public status: EUserSessionStatus;

  @ApiProperty()
  public current: boolean;

  @ApiProperty()
  public lastActiveAt: Date;

  @ApiPropertyOptional()
  public endedAt?: Date;

  @ApiProperty()
  public createdAt: Date;
}
