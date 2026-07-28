import { AutoMap } from '@automapper/classes';
import { PageableFilter, QueryBase } from 'src/common';
import { EProductLogAction } from 'src/infrastructure/persistence/entities';
import { ProductLogFilter } from '../../domain';

export class ListLogsByProductQuery extends QueryBase implements PageableFilter<ProductLogFilter> {
  @AutoMap() public productId: string;
  @AutoMap() public organizationId?: string;
  @AutoMap(() => String) public action?: EProductLogAction;
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
