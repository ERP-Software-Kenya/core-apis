import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { numericTransformer } from './numeric.transformer';
import { OrganizationEntity } from './organization.entity';
import { CustomerEntity } from './customer.entity';
import { BillEntity } from './bill.entity';
import { UserEntity } from './user.entity';

const PK_NAME = 'PK_' + ECoreTableName.CreditApprovalRequests;

export enum ECreditApprovalStatus {
  Pending  = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.CreditApprovalRequests })
export class CreditApprovalRequestEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'customer_id', type: 'uuid' })
  public customerId: string;

  @AutoMap()
  @Column({ name: 'bill_id', type: 'uuid' })
  public billId: string;

  @AutoMap()
  @Column({ name: 'requested_amount', type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer })
  public requestedAmount: number;

  @AutoMap()
  @Column({ name: 'requested_by_id', type: 'uuid' })
  public requestedById: string;

  @AutoMap(() => String)
  @Column({ type: 'enum', enum: ECreditApprovalStatus, default: ECreditApprovalStatus.Pending })
  public status: ECreditApprovalStatus;

  @AutoMap()
  @Column({ name: 'decided_by_id', type: 'uuid', nullable: true })
  public decidedById?: string;

  @AutoMap(() => Date)
  @Column({ name: 'decided_at', type: 'timestamp', nullable: true })
  public decidedAt?: Date;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.CreditApprovalRequests}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap(() => CustomerEntity)
  @ManyToOne(() => CustomerEntity)
  @JoinColumn({
    name: 'customer_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.CreditApprovalRequests}__${ECoreTableName.Customers}`,
  })
  public customer: CustomerEntity;

  @AutoMap(() => BillEntity)
  @ManyToOne(() => BillEntity)
  @JoinColumn({
    name: 'bill_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.CreditApprovalRequests}__${ECoreTableName.Bills}`,
  })
  public bill: BillEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'requested_by_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.CreditApprovalRequests}__requested_by__${ECoreTableName.Users}`,
  })
  public requestedBy: UserEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({
    name: 'decided_by_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.CreditApprovalRequests}__decided_by__${ECoreTableName.Users}`,
  })
  public decidedBy?: UserEntity;
}
