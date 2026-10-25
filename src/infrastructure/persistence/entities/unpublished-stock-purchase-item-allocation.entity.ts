import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { UnpublishedStockPurchaseItemEntity } from './unpublished-stock-purchase-item.entity';
import { UnpublishedStockPurchaseOrderEntity } from './unpublished-stock-purchase-order.entity';
import { LocationEntity } from './location.entity';
import { UserEntity } from './user.entity';

const PK_NAME = 'PK_' + ECoreTableName.UnpublishedStockPurchaseItemAllocations;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.UnpublishedStockPurchaseItemAllocations })
export class UnpublishedStockPurchaseItemAllocationEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public purchaseOrderId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public purchaseItemId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public locationId: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public quantity: number;

  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  public performedById?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public notes?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => UnpublishedStockPurchaseOrderEntity)
  @ManyToOne(() => UnpublishedStockPurchaseOrderEntity)
  @JoinColumn({
    name: 'purchase_order_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK__uspia__us_purchase_orders',
  })
  public purchaseOrder: UnpublishedStockPurchaseOrderEntity;

  @AutoMap(() => UnpublishedStockPurchaseItemEntity)
  @ManyToOne(() => UnpublishedStockPurchaseItemEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'purchase_item_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK__uspia__us_purchase_items',
  })
  public purchaseItem: UnpublishedStockPurchaseItemEntity;

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity)
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UnpublishedStockPurchaseItemAllocations}__${ECoreTableName.Locations}`,
  })
  public location: LocationEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({
    name: 'performed_by_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UnpublishedStockPurchaseItemAllocations}__${ECoreTableName.Users}`,
  })
  public performedBy?: UserEntity;
}
