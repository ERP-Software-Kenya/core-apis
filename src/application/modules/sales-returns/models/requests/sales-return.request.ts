import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { ESalesReturnItemCondition, ESalesReturnStatus } from '../../../../../infrastructure/persistence/entities';

export class SalesReturnItemRequest {
  @ApiProperty() @IsUUID() @AutoMap() public billItemId: string;
  @ApiProperty() @IsNumber() @Min(0.0001) @AutoMap() public quantity: number;
  @ApiProperty({ enum: ESalesReturnItemCondition }) @IsEnum(ESalesReturnItemCondition) @AutoMap(() => String) public condition: ESalesReturnItemCondition;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public reason?: string;
}

export class CreateSalesReturnRequest {
  @ApiProperty() @IsUUID() @AutoMap() public billId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public reason?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public refundMethod?: string;
  @ApiProperty({ type: [SalesReturnItemRequest] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalesReturnItemRequest)
  @AutoMap(() => [SalesReturnItemRequest])
  public items: SalesReturnItemRequest[];
}

export class UpdateSalesReturnRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public reason?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public refundMethod?: string;
  @ApiPropertyOptional({ type: [SalesReturnItemRequest] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalesReturnItemRequest)
  @AutoMap(() => [SalesReturnItemRequest])
  public items?: SalesReturnItemRequest[];
}

export class ListSalesReturnsRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public locationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public billId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public customerId?: string;
  @ApiPropertyOptional({ enum: ESalesReturnStatus }) @IsOptional() @IsEnum(ESalesReturnStatus) @AutoMap(() => String) public status?: ESalesReturnStatus;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public returnNumber?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $orderBy?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $order?: string;
}

export class SearchSalesReturnsRequest extends ListSalesReturnsRequest {
  @ApiPropertyOptional({ default: 1 }) @IsOptional() @Type(() => Number) @IsInt() @Min(1) @AutoMap() public $page?: number;
  @ApiPropertyOptional({ default: 20 }) @IsOptional() @Type(() => Number) @IsInt() @Min(1) @AutoMap() public $perPage?: number;
}
