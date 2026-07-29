import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class ListProductSuppliersQuery extends QueryBase {
  @AutoMap() public productId: string;
}
