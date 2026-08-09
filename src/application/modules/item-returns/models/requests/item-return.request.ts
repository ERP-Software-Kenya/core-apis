import { ApiProperty } from '@nestjs/swagger';

export class CreateItemReturnRequest {
  @ApiProperty() public locationId: string;
  @ApiProperty({ required: false }) public orderId?: string;
  @ApiProperty({ required: false }) public supplierId?: string;
  @ApiProperty() public returnType: string;
  @ApiProperty({ default: 'PENDING' }) public status?: string;
  @ApiProperty() public totalAmount: number;
}

export class UpdateItemReturnRequest {
  @ApiProperty({ required: false }) public status?: string;
  @ApiProperty({ required: false }) public totalAmount?: number;
}

export class SearchItemReturnsRequest {
  @ApiProperty({ required: false }) public locationId?: string;
  @ApiProperty({ required: false }) public status?: string;
  @ApiProperty({ required: false, default: 1 }) public $page?: number;
  @ApiProperty({ required: false, default: 10 }) public $perPage?: number;
}

export class ListItemReturnsRequest {
  @ApiProperty({ required: false }) public locationId?: string;
  @ApiProperty({ required: false }) public status?: string;
}
