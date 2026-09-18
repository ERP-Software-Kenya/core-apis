import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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
import { OrganizationEntity } from './organization.entity';
import { LocationEntity } from './location.entity';
import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';
import { QuotationItemEntity } from './quotation-item.entity';
import { EQuotationStatus } from '../../../application/shared/enums';

const PK_NAME = 'PK_' + ECoreTableName.Quotations;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Quotations })
@Index(['rootQuotationId', 'versionNumber'], { unique: true })
@Index(['organizationId', 'quoteNumber'])
export class QuotationEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'quote_number', type: 'varchar', length: 60 })
  public quoteNumber: string;

  @AutoMap()
  @Column({ name: 'version_number', type: 'int', default: 1 })
  public versionNumber: number;

  @AutoMap()
  @Column({ name: 'root_quotation_id', type: 'uuid' })
  public rootQuotationId: string;

  @AutoMap()
  @Column({ name: 'parent_quotation_id', type: 'uuid', nullable: true })
  public parentQuotationId?: string;

  @AutoMap()
  @Column({ name: 'is_latest', type: 'boolean', default: true })
  public isLatest: boolean;

  @AutoMap()
  @Column({
    type: 'varchar',
    length: 30,
    default: EQuotationStatus.Draft,
  })
  public status: EQuotationStatus;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'location_id', type: 'uuid' })
  public locationId: string;

  @AutoMap()
  @Column({ name: 'customer_id', type: 'uuid' })
  public customerId: string;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: 0,
    transformer: numericTransformer,
  })
  public subtotal: number;

  @AutoMap()
  @Column({
    name: 'tax_amount',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: 0,
    transformer: numericTransformer,
  })
  public taxAmount: number;

  @AutoMap()
  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: 0,
    transformer: numericTransformer,
  })
  public totalAmount: number;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public notes?: string;

  @AutoMap()
  @Column({ name: 'converted_order_id', type: 'uuid', nullable: true, unique: true })
  public convertedOrderId?: string;

  @AutoMap()
  @Column({ name: 'created_by_user_id', type: 'uuid', nullable: true })
  public createdByUserId?: string;

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
    foreignKeyConstraintName: `FK__${ECoreTableName.Quotations}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity)
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Quotations}__${ECoreTableName.Locations}`,
  })
  public location: LocationEntity;

  @AutoMap(() => CustomerEntity)
  @ManyToOne(() => CustomerEntity)
  @JoinColumn({
    name: 'customer_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Quotations}__${ECoreTableName.Customers}`,
  })
  public customer: CustomerEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'created_by_user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Quotations}__${ECoreTableName.Users}`,
  })
  public createdByUser?: UserEntity;

  @AutoMap(() => OrderEntity)
  @ManyToOne(() => OrderEntity)
  @JoinColumn({
    name: 'converted_order_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Quotations}__${ECoreTableName.Orders}`,
  })
  public convertedOrder?: OrderEntity;

  @AutoMap(() => QuotationEntity)
  @ManyToOne(() => QuotationEntity, (quotation) => quotation.childQuotations)
  @JoinColumn({
    name: 'parent_quotation_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Quotations}__parent_quotation`,
  })
  public parentQuotation?: QuotationEntity;

  @AutoMap(() => [QuotationEntity])
  @OneToMany(() => QuotationEntity, (quotation) => quotation.parentQuotation)
  public childQuotations?: QuotationEntity[];

  @AutoMap(() => [QuotationItemEntity])
  @OneToMany(() => QuotationItemEntity, (item) => item.quotation, { cascade: true })
  public items?: QuotationItemEntity[];
}
