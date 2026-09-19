import { CommandBase } from "src/common";

export class FinalizeSalesReturnCommand extends CommandBase{
  public id: string;
  public performedById?: string;
}
