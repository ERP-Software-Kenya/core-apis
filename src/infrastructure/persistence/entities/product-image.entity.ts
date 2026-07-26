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
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

const PK_NAME = 'PK_' + ECoreTableName.ProductImages;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.ProductImages })
export class ProductImageEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  /** B2 storage key — e.g. products/{productId}/images/{imageId}.jpg */
  @AutoMap()
  @Column({ name: 'storage_key', type: 'varchar', length: 500 })
  public storageKey: string;

  @AutoMap()
  @Column({ name: 'sort_order', type: 'integer', default: 0 })
  public sortOrder: number;

  @AutoMap()
  @Column({ name: 'is_primary', type: 'boolean', default: false })
  public isPrimary: boolean;

  @AutoMap()
  @Column({ name: 'uploaded_by_id', type: 'uuid', nullable: true })
  public uploadedById?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity, (product) => product.images, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ProductImages}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({
    name: 'uploaded_by_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ProductImages}__${ECoreTableName.Users}`,
  })
  public uploadedBy?: UserEntity;
}
