import { CommandBase } from 'src/common';

export class ReceiveUnpublishedStockPOItemInput {
  public purchaseItemId: string;
  public quantityReceived: number;
}

export class ReceiveUnpublishedStockPOCommand extends CommandBase {
  public purchaseOrderId: string;
  public organizationId: string;
  public items: ReceiveUnpublishedStockPOItemInput[];
  public performedById?: string;
  public notes?: string;
}
