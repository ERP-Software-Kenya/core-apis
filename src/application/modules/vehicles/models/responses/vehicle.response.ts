import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class VehicleResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public vehicleNumber: string;
  @ApiPropertyOptional() @AutoMap() public vinNumber?: string;
  @ApiPropertyOptional() @AutoMap() public registrationNumber?: string;
  @ApiProperty() @AutoMap() public companyId: string;
  @ApiProperty() @AutoMap() public vehicleTypeId: string;
  @ApiProperty() @AutoMap() public brandId: string;
  @ApiPropertyOptional() @AutoMap() public model?: string;
  @ApiPropertyOptional() @AutoMap() public color?: string;
  @ApiProperty() @AutoMap() public fuelTypeId: string;
  @ApiPropertyOptional() @AutoMap() public status?: string;
  @ApiPropertyOptional() @AutoMap() public imageUrl?: string;
}
