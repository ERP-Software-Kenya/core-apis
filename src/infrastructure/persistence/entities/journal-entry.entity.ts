import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { JournalEntryStatus } from '../../../application/modules/accounting';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.JournalEntries })
@Index('UQ_journal_entries_org_idempotency', ['organizationId', 'idempotencyKey'], { unique: true })
@Index('UQ_journal_entries_org_number', ['organizationId', 'entryNumber'], { unique: true })
@Index('IDX_journal_entries_source', ['organizationId', 'sourceType', 'sourceId'])
export class JournalEntryEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_journal_entries' })
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

  @Column({ name: 'reversal_of_id', type: 'uuid', nullable: true })
  public reversalOfId?: string;

  @Column({ name: 'created_by', type: 'uuid' })
  public createdBy: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;
}
