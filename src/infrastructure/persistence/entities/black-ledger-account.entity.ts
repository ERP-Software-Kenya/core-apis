import { Check, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AccountType } from '../../../application/modules/accounting';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.BlackLedgerAccounts })
@Index('UQ_black_ledger_accounts_org_code', ['organizationId', 'code'], { unique: true })
@Check('CHK_black_ledger_accounts_code_not_blank', `length(trim("code")) > 0`)
export class BlackLedgerAccountEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_black_ledger_accounts' })
  public id: string;

  @Column({ name: 'org_id', type: 'uuid' })
  public organizationId: string;

  @Column({ type: 'varchar', length: 30 })
  public code: string;

  @Column({ type: 'varchar', length: 150 })
  public name: string;

  @Column({ type: 'enum', enum: AccountType })
  public type: AccountType;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  public isActive: boolean;
}
