import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DriverResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiPropertyOptional() @AutoMap() public employeeId?: string;
  @ApiProperty() @AutoMap() public firstName: string;
  @ApiProperty() @AutoMap() public lastName: string;
  @ApiProperty() @AutoMap() public phone: string;
  @ApiPropertyOptional() @AutoMap() public email?: string;
  @ApiProperty() @AutoMap() public licenseNumber: string;
  @ApiPropertyOptional() @AutoMap() public licenseType?: string;
  @ApiPropertyOptional() @AutoMap() public address?: string;
  @ApiPropertyOptional() @AutoMap() public emergencyContact?: string;
  @ApiPropertyOptional() @AutoMap() public status?: string;
}
