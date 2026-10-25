import { Check, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AccountingPeriodStatus } from '../../../application/modules/accounting';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.AccountingPeriods })
@Index('UQ_accounting_periods_org_dates', ['organizationId', 'startsOn', 'endsOn'], { unique: true })
@Check('CHK_accounting_periods_dates', `"starts_on" <= "ends_on"`)
export class AccountingPeriodEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_accounting_periods' })
  public id: string;

  @Column({ name: 'org_id', type: 'uuid' })
  public organizationId: string;

  @Column({ name: 'starts_on', type: 'date' })
  public startsOn: string;

  @Column({ name: 'ends_on', type: 'date' })
  public endsOn: string;

  @Column({ type: 'enum', enum: AccountingPeriodStatus, default: AccountingPeriodStatus.Open })
  public status: AccountingPeriodStatus;
}
