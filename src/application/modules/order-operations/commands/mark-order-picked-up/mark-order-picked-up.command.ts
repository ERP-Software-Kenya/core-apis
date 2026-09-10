import { CommandBase } from '../../../../../common';

export class MarkOrderPickedUpCommand extends CommandBase {
  public orderId: string;
  public userId: string;
  public organizationId: string;
}
