import { ApiProperty } from '@nestjs/swagger';

export class OrganizationSettingResponse {
  @ApiProperty() public id: string;
  @ApiProperty() public organizationId: string;
  @ApiProperty({ example: 'USD' }) public baseCurrencyCode: string;
  @ApiProperty({ default: 4 }) public fiscalYearStartMonth: number;
  @ApiProperty({ default: 'UTC' }) public timeZone: string;
  @ApiProperty() public updatedAt: Date;
}
