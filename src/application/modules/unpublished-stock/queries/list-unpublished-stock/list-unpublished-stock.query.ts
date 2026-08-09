import { AutoMap } from '@automapper/classes';
import { Filter, QueryBase } from 'src/common';
import { UnpublishedStockFilter } from '../../i-unpublished-stock.repo';

export class ListUnpublishedStockQuery extends QueryBase implements Filter<UnpublishedStockFilter> {
  @AutoMap() public organizationId?: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public productId?: string;
}
