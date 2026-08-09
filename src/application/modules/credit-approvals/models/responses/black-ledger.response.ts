import { ApiProperty } from '@nestjs/swagger';
import { BillResponse } from '../../../bills/models';
import { CommissionPayableResponse } from './commission-payable.response';

export class BlackLedgerResponse {
  @ApiProperty({ type: [BillResponse] })
  public bills: BillResponse[];

  @ApiProperty({ type: [CommissionPayableResponse] })
  public commissions: CommissionPayableResponse[];
}
