import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetInvoiceQuery extends QueryBase {
  @AutoMap() public id: string;
}
