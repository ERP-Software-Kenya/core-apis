import { ApiProperty } from '@nestjs/swagger';

export class CreateBillRequest {
  @ApiProperty() public orgId: string;
  @ApiProperty() public billNumber: string;
  @ApiProperty() public amount: number;
  @ApiProperty({ default: 'UNPAID' }) public status?: string;
}

export class UpdateBillRequest {
  @ApiProperty({ required: false }) public status?: string;
  @ApiProperty({ required: false }) public amount?: number;
}

export class SearchBillsRequest {
  @ApiProperty({ required: false }) public orgId?: string;
  @ApiProperty({ required: false }) public status?: string;
  @ApiProperty({ required: false, default: 1 }) public $page?: number;
  @ApiProperty({ required: false, default: 20 }) public $perPage?: number;
}

export class ListBillsRequest {
  @ApiProperty({ required: false }) public orgId?: string;
}
