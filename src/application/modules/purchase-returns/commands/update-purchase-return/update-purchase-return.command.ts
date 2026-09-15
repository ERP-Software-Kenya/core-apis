import { CreatePurchaseReturnItemCommand } from '../create-purchase-return/create-purchase-return.command';

export class UpdatePurchaseReturnCommand {
  public id: string;
  public reason?: string;
  public notes?: string;
  public items?: CreatePurchaseReturnItemCommand[];
}
