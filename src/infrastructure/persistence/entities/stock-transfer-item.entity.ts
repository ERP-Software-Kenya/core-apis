import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { StockTransferEntity } from './stock-transfer.entity';
import { ProductEntity } from './product.entity';

const PK_NAME = 'PK_' + ECoreTableName.StockTransferItems;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.StockTransferItems })
export class StockTransferItemEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'transfer_id', type: 'uuid' })
  public transferId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ name: 'variant_id', type: 'uuid', nullable: true })
  public variantId?: string;

  @AutoMap()
  @Column({ name: 'quantity_sent', type: 'decimal', precision: 18, scale: 4 })
  public quantitySent: number;

  @AutoMap()
  @Column({ name: 'quantity_received', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public quantityReceived: number;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => StockTransferEntity)
  @ManyToOne(() => StockTransferEntity, (st) => st.items)
  @JoinColumn({
    name: 'transfer_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockTransferItems}__${ECoreTableName.StockTransfers}`,
  })
  public stockTransfer: StockTransferEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockTransferItems}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;
}
