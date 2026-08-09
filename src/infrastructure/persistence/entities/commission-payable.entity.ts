import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { numericTransformer } from './numeric.transformer';
import { OrganizationEntity } from './organization.entity';
import { BillEntity } from './bill.entity';
import { UserEntity } from './user.entity';

const PK_NAME = 'PK_' + ECoreTableName.CommissionPayables;

export enum ECommissionStatus {
  Owed = 'owed',
  Paid = 'paid',
}

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.CommissionPayables })
export class CommissionPayableEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'bill_id', type: 'uuid' })
  public billId: string;

  @AutoMap()
  @Column({ name: 'facilitator_user_id', type: 'uuid', nullable: true })
  public facilitatorUserId?: string;

  @AutoMap()
  @Column({ name: 'facilitator_name', type: 'varchar', length: 255, nullable: true })
  public facilitatorName?: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer })
  public amount: number;

  @AutoMap(() => String)
  @Column({ type: 'enum', enum: ECommissionStatus, default: ECommissionStatus.Owed })
  public status: ECommissionStatus;

  @AutoMap(() => Date)
  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  public paidAt?: Date;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.CommissionPayables}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap(() => BillEntity)
  @ManyToOne(() => BillEntity)
  @JoinColumn({
    name: 'bill_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.CommissionPayables}__${ECoreTableName.Bills}`,
  })
  public bill: BillEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({
    name: 'facilitator_user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.CommissionPayables}__${ECoreTableName.Users}`,
  })
  public facilitatorUser?: UserEntity;
}
