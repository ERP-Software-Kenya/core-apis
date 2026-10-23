import { CommandBase } from '../../../../../common';

export class ReviseQuotationCommand extends CommandBase {
  public id: string;
  public organizationId: string;
  public createdByUserId?: string;
}
