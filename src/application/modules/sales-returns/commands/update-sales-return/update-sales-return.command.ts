import { CreateSalesReturnItemCommand } from '../create-sales-return/create-sales-return.command';

export class UpdateSalesReturnCommand {
  public id: string;
  public reason?: string;
  public notes?: string;
  public refundMethod?: string;
  public items?: CreateSalesReturnItemCommand[];
}
