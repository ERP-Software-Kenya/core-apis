import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsUUID, ValidateNested } from 'class-validator';

export class CompleteTransferItemRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public fromInventoryId: string;
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public toInventoryId: string;
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public productId: string;
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public fromLocationId: string;
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public toLocationId: string;
  @ApiProperty() @IsNotEmpty() @IsNumber() @IsPositive() @AutoMap() public quantity: number;
}

export class CompleteStockTransferRequest {
  @ApiProperty({ type: [CompleteTransferItemRequest] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompleteTransferItemRequest)
  public items: CompleteTransferItemRequest[];
}
