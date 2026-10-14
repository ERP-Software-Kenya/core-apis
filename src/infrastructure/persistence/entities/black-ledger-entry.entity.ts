import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { JournalEntryStatus } from '../../../application/modules/accounting';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.BlackLedgerEntries })
@Index('UQ_black_ledger_entries_org_idempotency', ['organizationId', 'idempotencyKey'], { unique: true })
@Index('UQ_black_ledger_entries_org_number', ['organizationId', 'entryNumber'], { unique: true })
export class BlackLedgerEntryEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_black_ledger_entries' })
  public id: string;

  @Column({ name: 'org_id', type: 'uuid' })
  public organizationId: string;

  @Column({ name: 'entry_number', type: 'bigint' })
  public entryNumber: number;

  @Column({ name: 'idempotency_key', type: 'varchar', length: 150 })
  public idempotencyKey: string;

  @Column({ name: 'source_type', type: 'varchar', length: 50 })
  public sourceType: string;

  @Column({ name: 'source_id', type: 'uuid' })
  public sourceId: string;

  @Column({ name: 'occurred_at', type: 'timestamptz' })
  public occurredAt: Date;

  @Column({ type: 'varchar', length: 500 })
  public description: string;

  @Column({ type: 'enum', enum: JournalEntryStatus, default: JournalEntryStatus.Posted })
  public status: JournalEntryStatus;

  @Column({ name: 'created_by', type: 'uuid' })
  public createdBy: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;
}
