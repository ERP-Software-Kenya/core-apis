import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { OrganizationEntity } from './organization.entity';
import { LocationEntity } from './location.entity';
import { EExpenseStatus } from '../../e-expense-status';

const PK_NAME = 'PK_' + ECoreTableName.Expenses;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Expenses })
export class ExpenseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'org_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'location_id', type: 'uuid', nullable: true })
  public locationId?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50 })
  public category: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public amount: number;

  @AutoMap(() => Date)
  @Column({ name: 'expense_date', type: 'timestamp' })
  public expenseDate: Date;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public description?: string;

  @AutoMap(() => String)
  @Column({ type: 'varchar', length: 20, default: EExpenseStatus.Pending })
  public status: EExpenseStatus;

  @AutoMap()
  @Column({ name: 'submitted_by', type: 'varchar', length: 255, nullable: true })
  public submittedBy?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => Date)
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deletedAt?: Date;

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'org_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Expenses}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity)
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Expenses}__${ECoreTableName.Locations}`,
  })
  public location?: LocationEntity;
}
