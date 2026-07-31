import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { OrganizationEntity } from './organization.entity';
import { LocationEntity } from './location.entity';
import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';
import { BillItemEntity } from './bill-item.entity';

export enum EBillStatus {
  INITIATED = 'INITIATED',
  DRAFT = 'DRAFT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum EPaymentMethod {
  CASH         = 'CASH',
  CARD         = 'CARD',
  UPI          = 'UPI',
  NET_BANKING  = 'NET_BANKING',
  CHEQUE       = 'CHEQUE',
  CREDIT       = 'CREDIT',
}

const PK_NAME = 'PK_' + ECoreTableName.Bills;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Bills })
export class BillEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'bill_number', type: 'varchar', length: 50, unique: true })
  public billNumber: string;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'location_id', type: 'uuid' })
  public locationId: string;

  @AutoMap()
  @Column({ name: 'customer_id', type: 'uuid', nullable: true })
  public customerId?: string;

  @AutoMap()
  @Column({ name: 'created_by_id', type: 'uuid' })
  public createdById: string;

  @AutoMap()
  @Column({ name: 'walk_in_name', type: 'varchar', length: 255, nullable: true })
  public walkInName?: string;

  @AutoMap()
  @Column({ name: 'walk_in_phone', type: 'varchar', length: 20, nullable: true })
  public walkInPhone?: string;

  @AutoMap()
  @Column({ name: 'walk_in_gstin', type: 'varchar', length: 50, nullable: true })
  public walkInGstin?: string;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: EBillStatus,
    default: EBillStatus.INITIATED,
  })
  public status: EBillStatus;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public subtotal: number;

  @AutoMap()
  @Column({ name: 'tax_amount', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public taxAmount: number;

  @AutoMap()
  @Column({ name: 'discount_amount', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public discountAmount: number;

  @AutoMap()
  @Column({ name: 'total_amount', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public totalAmount: number;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public notes?: string;

  @AutoMap()
  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: EPaymentMethod,
    nullable: true,
  })
  public paymentMethod?: EPaymentMethod;

  @AutoMap(() => Date)
  @Column({ name: 'billed_at', type: 'timestamp', nullable: true })
  public billedAt?: Date;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => Date)
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  public deletedAt?: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Bills}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity)
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Bills}__${ECoreTableName.Locations}`,
  })
  public location: LocationEntity;

  @AutoMap(() => CustomerEntity)
  @ManyToOne(() => CustomerEntity)
  @JoinColumn({
    name: 'customer_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Bills}__${ECoreTableName.Customers}`,
  })
  public customer?: CustomerEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'created_by_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Bills}__${ECoreTableName.Users}`,
  })
  public createdBy: UserEntity;

  @AutoMap(() => [BillItemEntity])
  @OneToMany(() => BillItemEntity, (item) => item.bill)
  public items: BillItemEntity[];
}
