import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { ProductEntity } from './product.entity';
import { OrganizationUnitEntity } from './organization-unit.entity';

const PK_NAME = 'PK_' + ECoreTableName.ProductUnits;

@Unique(`UQ__${ECoreTableName.ProductUnits}__product_unit`, ['productId', 'unitId'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.ProductUnits })
export class ProductUnitEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ name: 'unit_id', type: 'uuid' })
  public unitId: string;

  @AutoMap()
  @Column({ name: 'is_default', type: 'boolean', default: false })
  public isDefault: boolean;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity, (p) => p.productUnits, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ProductUnits}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;

  @AutoMap(() => OrganizationUnitEntity)
  @ManyToOne(() => OrganizationUnitEntity, { eager: false })
  @JoinColumn({
    name: 'unit_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ProductUnits}__${ECoreTableName.OrganizationUnits}`,
  })
  public unit: OrganizationUnitEntity;
}
