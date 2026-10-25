import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { EPurchaseReturnItemSourceType, EPurchaseReturnStatus } from '../../../../../infrastructure/persistence/entities';

export class PurchaseReturnItemRequest {
  @ApiProperty() @IsUUID() @AutoMap() public purchaseItemId: string;
  @ApiProperty() @IsNumber() @Min(0.0001) @AutoMap() public quantity: number;
  @ApiProperty({ enum: EPurchaseReturnItemSourceType }) @IsEnum(EPurchaseReturnItemSourceType) @AutoMap(() => String) public sourceType: EPurchaseReturnItemSourceType;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public locationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public reason?: string;
}

export class CreatePurchaseReturnRequest {
  @ApiProperty() @IsUUID() @AutoMap() public purchaseOrderId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public reason?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;
  @ApiProperty({ type: [PurchaseReturnItemRequest] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseReturnItemRequest)
  @AutoMap(() => [PurchaseReturnItemRequest])
  public items: PurchaseReturnItemRequest[];
}

export class UpdatePurchaseReturnRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public reason?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;
  @ApiPropertyOptional({ type: [PurchaseReturnItemRequest] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseReturnItemRequest)
  @AutoMap(() => [PurchaseReturnItemRequest])
  public items?: PurchaseReturnItemRequest[];
}

export class ListPurchaseReturnsRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public purchaseOrderId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public supplierId?: string;
  @ApiPropertyOptional({ enum: EPurchaseReturnStatus }) @IsOptional() @IsEnum(EPurchaseReturnStatus) @AutoMap(() => String) public status?: EPurchaseReturnStatus;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public returnNumber?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $orderBy?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $order?: string;
}

export class SearchPurchaseReturnsRequest extends ListPurchaseReturnsRequest {
  @ApiPropertyOptional({ default: 1 }) @IsOptional() @Type(() => Number) @IsInt() @Min(1) @AutoMap() public $page?: number;
  @ApiPropertyOptional({ default: 20 }) @IsOptional() @Type(() => Number) @IsInt() @Min(1) @AutoMap() public $perPage?: number;
}
