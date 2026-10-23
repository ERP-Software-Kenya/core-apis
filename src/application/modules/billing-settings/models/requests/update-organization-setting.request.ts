import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, Max, MaxLength, Min } from 'class-validator';

export class UpdateOrganizationSettingRequest {
  @ApiProperty({ example: 'USD' })
  @IsString()
  @Length(3, 3)
  public baseCurrencyCode: string;

  @ApiProperty({ minimum: 1, maximum: 12, default: 4 })
  @IsInt()
  @Min(1)
  @Max(12)
  public fiscalYearStartMonth: number;

  @ApiProperty({ example: 'Asia/Kolkata', default: 'UTC' })
  @IsString()
  @MaxLength(100)
  public timeZone: string;
}
