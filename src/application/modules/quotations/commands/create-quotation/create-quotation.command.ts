import { CommandBase } from '../../../../../common';
import { CreateQuotationItemDto } from '../../models';

export class CreateQuotationCommand extends CommandBase {
  public organizationId: string;
  public locationId: string;
  public customerId: string;
  public notes?: string;
  public items: CreateQuotationItemDto[];
  public createdByUserId?: string;
}
