import { Check, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.BlackLedgerLines })
@Index('IDX_black_ledger_lines_entry', ['entryId'])
@Index('IDX_black_ledger_lines_supplier', ['supplierId'])
@Index('IDX_black_ledger_lines_customer', ['customerId'])
@Check('CHK_black_ledger_lines_one_side', `("debit" > 0 AND "credit" = 0) OR ("credit" > 0 AND "debit" = 0)`)
export class BlackLedgerLineEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_black_ledger_lines' })
  public id: string;

  @Column({ name: 'entry_id', type: 'uuid' })
  public entryId: string;

  @Column({ name: 'account_id', type: 'uuid' })
  public accountId: string;

  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public debit: string;

  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public credit: string;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  public branchId?: string;

  @Column({ name: 'location_id', type: 'uuid', nullable: true })
  public locationId?: string;

  @Column({ name: 'customer_id', type: 'uuid', nullable: true })
  public customerId?: string;

  @Column({ name: 'supplier_id', type: 'uuid', nullable: true })
  public supplierId?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  public description?: string;
}
