import { CommandBase } from 'src/common';

export class UnpublishedStockAllocationInput {
  public purchaseItemId: string;
  public locationId: string;
  public quantity: number;
}

export class AllocateUnpublishedStockPOCommand extends CommandBase {
  public purchaseOrderId: string;
  public organizationId: string;
  public allocations: UnpublishedStockAllocationInput[];
  public performedById?: string;
  public notes?: string;
}
