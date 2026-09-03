import { AutoMap } from '@automapper/classes';
import { EFulfillmentMode } from '../../../../shared/enums/e-fulfillment-mode';

export class SearchOrdersQuery {
  @AutoMap() public organizationId?: string;
  @AutoMap() public status?: string;
  @AutoMap() public fulfillmentMode?: EFulfillmentMode;
  @AutoMap() public search?: string;
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
