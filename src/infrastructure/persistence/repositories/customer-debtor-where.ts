import { FindOptionsWhere, MoreThan, Raw } from 'typeorm';
import { CustomerEntity } from '../entities';
import { CustomerDebtorFilter } from '../../../application/modules/customers/domain/customer-debtor-filter';

const limitColumnOf = (balanceAlias: string): string => balanceAlias.replace(/creditBalance$/, 'creditLimit');

/**
 * any = limit>0 OR balance>0; with-dues = balance>0; over-limit = limit>0 AND balance>limit.
 * Returns a single where object (never an array): the base repo spreads `where` when applying soft-delete.
 */
export function buildDebtorWhere(base: FindOptionsWhere<CustomerEntity>, mode: CustomerDebtorFilter): FindOptionsWhere<CustomerEntity> {
  if (mode === 'with-dues') {
    return { ...base, creditBalance: MoreThan(0) };
  }
  if (mode === 'over-limit') {
    return {
      ...base,
      creditLimit: MoreThan(0),
      creditBalance: Raw((alias) => `${alias} > ${limitColumnOf(alias)}`),
    };
  }
  return {
    ...base,
    creditBalance: Raw((alias) => `(${alias} > 0 OR COALESCE(${limitColumnOf(alias)}, 0) > 0)`),
  };
}
