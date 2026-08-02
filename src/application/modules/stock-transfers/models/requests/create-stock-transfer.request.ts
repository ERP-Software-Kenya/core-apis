import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateStockTransferRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public fromLocationId: string;
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public toLocationId: string;
}
