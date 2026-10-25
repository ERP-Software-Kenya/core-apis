import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { numericTransformer } from './numeric.transformer';
import { BillItemEntity } from './bill-item.entity';
import { ProductEntity } from './product.entity';
import { SalesReturnEntity } from './sales-return.entity';

const PK_NAME = 'PK_' + ECoreTableName.SalesReturnItems;

export enum ESalesReturnItemCondition {
  Restock            = 'restock',
  Damaged            = 'damaged',
  UnpublishedRestock = 'unpublished_restock',
}

@Index(`IX__${ECoreTableName.SalesReturnItems}__bill_item`, ['billItemId'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.SalesReturnItems })
export class SalesReturnItemEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'sales_return_id', type: 'uuid' })
  public salesReturnId: string;

  @AutoMap()
  @Column({ name: 'bill_item_id', type: 'uuid' })
  public billItemId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ name: 'variant_id', type: 'uuid', nullable: true })
  public variantId?: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer })
  public quantity: number;

  @AutoMap()
  @Column({ name: 'unit_price', type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer })
  public unitPrice: number;

  @AutoMap()
  @Column({ name: 'tax_rate', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public taxRate: number;

  @AutoMap()
  @Column({ name: 'tax_amount', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public taxAmount: number;

  @AutoMap()
  @Column({ name: 'discount_amount', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public discountAmount: number;

  @AutoMap()
  @Column({ name: 'line_total', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public lineTotal: number;

  @AutoMap(() => String)
  @Column({ type: 'enum', enum: ESalesReturnItemCondition })
  public condition: ESalesReturnItemCondition;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public reason?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => SalesReturnEntity)
  @ManyToOne(() => SalesReturnEntity, (ret) => ret.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sales_return_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.SalesReturnItems}__${ECoreTableName.SalesReturns}` })
  public salesReturn: SalesReturnEntity;

  @AutoMap(() => BillItemEntity)
  @ManyToOne(() => BillItemEntity)
  @JoinColumn({ name: 'bill_item_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.SalesReturnItems}__${ECoreTableName.BillItems}` })
  public billItem: BillItemEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.SalesReturnItems}__${ECoreTableName.Products}` })
  public product: ProductEntity;
}
