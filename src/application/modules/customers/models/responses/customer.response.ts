import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomerResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public name: string;
  @ApiPropertyOptional() @AutoMap() public email?: string;
  @ApiPropertyOptional() @AutoMap() public phone?: string;
  @ApiPropertyOptional() @AutoMap() public gstin?: string;
}
