import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { BranchEntity } from './branch.entity';
import { ProductEntity } from './product.entity';

const PK_NAME = 'PK_' + ECoreTableName.ProductBranchPrices;

@Unique(`UQ__${ECoreTableName.ProductBranchPrices}__branch_product`, ['branchId', 'productId'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.ProductBranchPrices })
export class ProductBranchPriceEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'branch_id', type: 'uuid' })
  public branchId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ name: 'cost_price', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public costPrice: number | null;

  @AutoMap()
  @Column({ name: 'retail_price', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public retailPrice: number | null;

  @AutoMap()
  @Column({ name: 'loyalty_price', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public loyaltyPrice: number | null;

  @AutoMap()
  @Column({ name: 'wholesale_price', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public wholesalePrice: number | null;

  @AutoMap()
  @Column({ name: 'transfer_price', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public transferPrice: number | null;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => BranchEntity)
  @ManyToOne(() => BranchEntity)
  @JoinColumn({
    name: 'branch_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ProductBranchPrices}__${ECoreTableName.Branches}`,
  })
  public branch: BranchEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ProductBranchPrices}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;
}
