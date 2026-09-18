import { CommandBase } from '../../../../../common';
import { CreateQuotationItemDto } from '../../models';

export class UpdateQuotationCommand extends CommandBase {
  public id: string;
  public locationId?: string;
  public customerId?: string;
  public notes?: string;
  public items?: CreateQuotationItemDto[];
  public status?: string;
}
