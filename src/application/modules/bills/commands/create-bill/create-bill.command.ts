import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';
import { CreateBillItemRequest } from '../../models/requests/create-bill-item.request';

export class CreateBillCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public locationId: string;
  @AutoMap() public customerId?: string;
  @AutoMap() public createdById: string;
  @AutoMap() public walkInName?: string;
  @AutoMap() public walkInPhone?: string;
  @AutoMap() public walkInGstin?: string;
  @AutoMap() public notes?: string;
  @AutoMap(() => [CreateBillItemRequest]) public items: CreateBillItemRequest[];
}
