import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';

export class UnpublishedStockAllocationItemRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() public purchaseItemId: string;
  @ApiProperty() @IsNotEmpty() @IsUUID() public locationId: string;
  @ApiProperty() @IsNotEmpty() @IsNumber() @Min(0.0001) public quantity: number;
}

export class AllocateUnpublishedStockPORequest {
  @ApiProperty({ type: [UnpublishedStockAllocationItemRequest] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnpublishedStockAllocationItemRequest)
  public allocations: UnpublishedStockAllocationItemRequest[];

  @ApiPropertyOptional() @IsOptional() @IsString() public notes?: string;
}
