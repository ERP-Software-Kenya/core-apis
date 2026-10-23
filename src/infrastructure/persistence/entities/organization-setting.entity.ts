import { Check, Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { OrganizationEntity } from './organization.entity';

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.OrganizationSettings })
@Index('UQ_organization_settings_org', ['organizationId'], { unique: true })
@Check('CHK_organization_settings_fiscal_month', `"fiscal_year_start_month" BETWEEN 1 AND 12`)
export class OrganizationSettingEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_organization_settings' })
  public id: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @Column({ name: 'base_currency_code', type: 'varchar', length: 3, default: 'USD' })
  public baseCurrencyCode: string;

  @Column({ name: 'fiscal_year_start_month', type: 'smallint', default: 4 })
  public fiscalYearStartMonth: number;

  @Column({ name: 'time_zone', type: 'varchar', length: 100, default: 'UTC' })
  public timeZone: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  public updatedAt: Date;

  @OneToOne(() => OrganizationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK__organization_settings__organizations',
  })
  public organization: OrganizationEntity;
}
