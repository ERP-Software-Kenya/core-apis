import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentTransactionRequest {
  @ApiProperty() public orgId: string;
  @ApiProperty() public referenceId: string;
  @ApiProperty() public referenceType: string;
  @ApiProperty() public type: string;
  @ApiProperty() public method: string;
  @ApiProperty() public amount: number;
  @ApiProperty({ default: 'PENDING' }) public status?: string;
}

export class UpdatePaymentTransactionRequest {
  @ApiProperty({ required: false }) public status?: string;
}

export class SearchPaymentTransactionsRequest {
  @ApiProperty({ required: false }) public orgId?: string;
  @ApiProperty({ required: false }) public status?: string;
  @ApiProperty({ required: false, default: 1 }) public $page?: number;
  @ApiProperty({ required: false, default: 20 }) public $perPage?: number;
}

export class ListPaymentTransactionsRequest {
  @ApiProperty({ required: false }) public orgId?: string;
}
