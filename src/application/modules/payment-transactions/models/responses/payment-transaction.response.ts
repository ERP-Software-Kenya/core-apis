import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentTransactionResponse {
  @AutoMap() @ApiProperty() public id: string;
  @AutoMap() @ApiProperty() public orgId: string;
  @AutoMap() @ApiProperty() public referenceId: string;
  @AutoMap() @ApiProperty() public referenceType: string;
  @AutoMap() @ApiProperty() public type: string;
  @AutoMap() @ApiProperty() public method: string;
  @AutoMap() @ApiProperty() public amount: number;
  @AutoMap() @ApiProperty() public status: string;
  @AutoMap() @ApiProperty() public createdAt: Date;
}

export class PaymentTransactionsPagedResponse {
  @ApiProperty({ type: [PaymentTransactionResponse] }) public items: PaymentTransactionResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
