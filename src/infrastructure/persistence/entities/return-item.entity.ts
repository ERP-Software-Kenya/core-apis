import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { ItemReturnEntity } from './item-return.entity';
import { ProductEntity } from './product.entity';

const PK_NAME = 'PK_' + ECoreTableName.ReturnItems;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.ReturnItems })
export class ReturnItemEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'return_id', type: 'uuid' })
  public returnId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ name: 'variant_id', type: 'uuid', nullable: true })
  public variantId?: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public quantity: number;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => ItemReturnEntity)
  @ManyToOne(() => ItemReturnEntity, (r) => r.items)
  @JoinColumn({
    name: 'return_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ReturnItems}__${ECoreTableName.ItemReturns}`,
  })
  public return: ItemReturnEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ReturnItems}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;
}
