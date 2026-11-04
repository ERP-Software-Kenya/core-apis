import { AutoMap } from '@automapper/classes';
import { CustomerDebtorFilter } from './customer-debtor-filter';

export class CustomerFilter {
  @AutoMap() public organizationId?: string;
  @AutoMap() public name?: string;
  @AutoMap() public phone?: string;
  @AutoMap() public hasCreditLimit?: boolean;
  @AutoMap(() => String) public debtors?: CustomerDebtorFilter;
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
