import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePurchaseItemRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public purchaseOrderId: string;
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public productId: string;
  @ApiProperty() @IsNotEmpty() @IsNumber() @AutoMap() public quantity: number;
  @ApiProperty() @IsNotEmpty() @IsNumber() @AutoMap() public unitPrice: number;
}
