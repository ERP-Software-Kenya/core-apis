import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { LocationEntity } from './location.entity';
import { ProductEntity } from './product.entity';
import { OrganizationEntity } from './organization.entity';
import { UnpublishedStockMovementEntity } from './unpublished-stock-movement.entity';

const PK_NAME = 'PK_' + ECoreTableName.UnpublishedStock;

@Unique(`UQ__${ECoreTableName.UnpublishedStock}__org_location_product`, ['organizationId', 'locationId', 'productId'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.UnpublishedStock })
export class UnpublishedStockEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'location_id', type: 'uuid' })
  public locationId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ name: 'quantity_on_hand', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public quantityOnHand: number;

  @AutoMap()
  @Column({ name: 'average_cost', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public averageCost?: number;

  @AutoMap()
  @Column({ name: 'bin_location', type: 'varchar', length: 100, nullable: true })
  public binLocation?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UnpublishedStock}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity)
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UnpublishedStock}__${ECoreTableName.Locations}`,
  })
  public location: LocationEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UnpublishedStock}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;

  @AutoMap(() => [UnpublishedStockMovementEntity])
  @OneToMany(() => UnpublishedStockMovementEntity, (mv) => mv.unpublishedStock)
  public movements?: UnpublishedStockMovementEntity[];
}
