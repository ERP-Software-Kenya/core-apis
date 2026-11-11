import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDriverLocationRequest {
  @ApiProperty() @IsNotEmpty() @IsNumber() @AutoMap() public latitude: number;
  @ApiProperty() @IsNotEmpty() @IsNumber() @AutoMap() public longitude: number;
  @ApiProperty() @IsNotEmpty() @IsNumber() @AutoMap() public accuracy: number;
}
