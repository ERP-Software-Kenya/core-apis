import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class ExportBillQuery extends QueryBase {
  @AutoMap() public id: string;
}
