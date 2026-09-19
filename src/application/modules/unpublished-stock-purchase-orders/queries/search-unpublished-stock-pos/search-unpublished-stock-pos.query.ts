import { AutoMap } from '@automapper/classes';
import { PageableFilter } from '../../../../../common';
import { UnpublishedStockPOFilter } from '../../domain';
import { ListUnpublishedStockPOsQuery } from '../list-unpublished-stock-pos';

export class SearchUnpublishedStockPOsQuery extends ListUnpublishedStockPOsQuery implements PageableFilter<UnpublishedStockPOFilter> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
