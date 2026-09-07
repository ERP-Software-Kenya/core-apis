import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { EFulfillmentMode } from '../../../../shared/enums/e-fulfillment-mode';
import { EPaymentTiming, ESaleType } from '../../../../../infrastructure/persistence/entities';
import { ECustomerType } from '../../../../../infrastructure/persistence/entities/e-customer-type';

export class CreateOrderItemRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() public productId: string;
  @ApiProperty() @IsNotEmpty() @IsNumber() @Min(0.0001) public quantity: number;
  @ApiProperty() @IsNotEmpty() @IsNumber() @Min(0) public unitPrice: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) public taxAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) public packQuantity?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(1) public packSizeSnapshot?: number;
}

export class CreateOrderRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public locationId: string;
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public customerId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public fulfillmentLocationId?: string;
  @ApiPropertyOptional({ enum: EFulfillmentMode }) @IsOptional() @IsEnum(EFulfillmentMode) @AutoMap() public fulfillmentMode?: EFulfillmentMode;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public status?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public subtotal?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public taxAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public totalAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public paymentStatus?: string;
  @ApiPropertyOptional({ enum: EPaymentTiming }) @IsOptional() @IsEnum(EPaymentTiming) @AutoMap(() => String) public paymentTiming?: EPaymentTiming;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public partialAmount?: number;
  @ApiPropertyOptional({ enum: ESaleType }) @IsOptional() @IsEnum(ESaleType) @AutoMap(() => String) public saleType?: ESaleType;
  @ApiPropertyOptional({ enum: ECustomerType }) @IsOptional() @IsEnum(ECustomerType) @AutoMap(() => String) public customerType?: ECustomerType;

  @ApiProperty({ type: [CreateOrderItemRequest] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemRequest)
  public items: CreateOrderItemRequest[];
}
