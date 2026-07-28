import { CommandBase } from '../../../../../common';

export class CancelStockTransferCommand extends CommandBase {
  public transferId: string;
  public performedById?: string;
}
