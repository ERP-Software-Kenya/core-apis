import { CommandBase } from '../../../../../common';

export class CreateCreditTransactionCommand extends CommandBase {
  public customerId: string;
  public organizationId: string;
  public type: 'payment' | 'adjustment';
  public amount: number;
  public paymentMethod?: string;
  public note?: string;
  public performedById?: string;
}
