import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { numericTransformer } from './numeric.transformer';
import { BillEntity, ESaleType } from './bill.entity';
import { CustomerEntity } from './customer.entity';
import { LocationEntity } from './location.entity';
import { OrganizationEntity } from './organization.entity';
import { SalesReturnItemEntity } from './sales-return-item.entity';
import { UserEntity } from './user.entity';

const PK_NAME = 'PK_' + ECoreTableName.SalesReturns;

export enum ESalesReturnStatus {
  Draft     = 'draft',
  Finalized = 'finalized',
  Cancelled = 'cancelled',
}

export enum ESalesReturnRefundStatus {
  None      = 'none',
  Pending   = 'pending',
  Completed = 'completed',
}

@Index(`IX__${ECoreTableName.SalesReturns}__org_location_status`, ['organizationId', 'locationId', 'status'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.SalesReturns })
export class SalesReturnEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'return_number', type: 'varchar', length: 50, unique: true })
  public returnNumber: string;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'location_id', type: 'uuid' })
  public locationId: string;

  @AutoMap()
  @Column({ name: 'bill_id', type: 'uuid' })
  public billId: string;

  @AutoMap()
  @Column({ name: 'customer_id', type: 'uuid', nullable: true })
  public customerId?: string;

  @AutoMap(() => String)
  @Column({ name: 'sale_type', type: 'enum', enum: ESaleType })
  public saleType: ESaleType;

  @AutoMap(() => String)
  @Column({ type: 'enum', enum: ESalesReturnStatus, default: ESalesReturnStatus.Draft })
  public status: ESalesReturnStatus;

  @AutoMap()
  @Column({ name: 'refund_method', type: 'varchar', length: 50, nullable: true })
  public refundMethod?: string;

  @AutoMap(() => String)
  @Column({ name: 'refund_status', type: 'enum', enum: ESalesReturnRefundStatus, default: ESalesReturnRefundStatus.None })
  public refundStatus: ESalesReturnRefundStatus;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public subtotal: number;

  @AutoMap()
  @Column({ name: 'tax_amount', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public taxAmount: number;

  @AutoMap()
  @Column({ name: 'discount_amount', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public discountAmount: number;

  @AutoMap()
  @Column({ name: 'total_amount', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public totalAmount: number;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public reason?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public notes?: string;

  @AutoMap()
  @Column({ name: 'created_by_id', type: 'uuid', nullable: true })
  public createdById?: string;

  @AutoMap()
  @Column({ name: 'finalized_by_id', type: 'uuid', nullable: true })
  public finalizedById?: string;

  @AutoMap(() => Date)
  @Column({ name: 'finalized_at', type: 'timestamp', nullable: true })
  public finalizedAt?: Date;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.SalesReturns}__${ECoreTableName.Organizations}` })
  public organization: OrganizationEntity;

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity)
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.SalesReturns}__${ECoreTableName.Locations}` })
  public location: LocationEntity;

  @AutoMap(() => BillEntity)
  @ManyToOne(() => BillEntity)
  @JoinColumn({ name: 'bill_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.SalesReturns}__${ECoreTableName.Bills}` })
  public bill: BillEntity;

  @AutoMap(() => CustomerEntity)
  @ManyToOne(() => CustomerEntity, { nullable: true })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.SalesReturns}__${ECoreTableName.Customers}` })
  public customer?: CustomerEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.SalesReturns}__${ECoreTableName.Users}` })
  public createdBy?: UserEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'finalized_by_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.SalesReturns}__finalized_by` })
  public finalizedBy?: UserEntity;

  @AutoMap(() => [SalesReturnItemEntity])
  @OneToMany(() => SalesReturnItemEntity, (item) => item.salesReturn, { cascade: true })
  public items?: SalesReturnItemEntity[];
}
