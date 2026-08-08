import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EBillStatus } from '../../../../../infrastructure/persistence/entities/bill.entity';
import { CreateBillItemRequest } from './create-bill-item.request';

export class CreateBillRequest {
  @ApiProperty() @IsUUID() @AutoMap() public locationId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public customerId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public walkInName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public walkInPhone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public walkInGstin?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;
  @ApiProperty({ type: [CreateBillItemRequest] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBillItemRequest)
  @AutoMap(() => [CreateBillItemRequest])
  public items: CreateBillItemRequest[];
}

export class UpdateBillRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public locationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public customerId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public walkInName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public walkInPhone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public walkInGstin?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;
}

export class SearchBillsRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public organizationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public locationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public customerId?: string;
  @ApiPropertyOptional({ enum: EBillStatus }) @IsOptional() @IsEnum(EBillStatus) @AutoMap(() => String) public status?: EBillStatus;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public $page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public $perPage?: number;
}

export class ListBillsRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public organizationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public locationId?: string;
  @ApiPropertyOptional({ enum: EBillStatus }) @IsOptional() @IsEnum(EBillStatus) @AutoMap(() => String) public status?: EBillStatus;
}
