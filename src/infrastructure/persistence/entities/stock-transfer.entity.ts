import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { OrganizationEntity } from './organization.entity';
import { LocationEntity } from './location.entity';
import { StockTransferItemEntity } from './stock-transfer-item.entity';

const PK_NAME = 'PK_' + ECoreTableName.StockTransfers;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.StockTransfers })
export class StockTransferEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'from_location_id', type: 'uuid' })
  public fromLocationId: string;

  @AutoMap()
  @Column({ name: 'to_location_id', type: 'uuid' })
  public toLocationId: string;

  @AutoMap()
  @Column({ name: 'transfer_number', type: 'varchar', length: 50, unique: true })
  public transferNumber: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, default: 'PENDING' })
  public status: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => Date)
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  public deletedAt?: Date;

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockTransfers}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity)
  @JoinColumn({
    name: 'from_location_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockTransfers}__from_${ECoreTableName.Locations}`,
  })
  public fromLocation: LocationEntity;

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity)
  @JoinColumn({
    name: 'to_location_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockTransfers}__to_${ECoreTableName.Locations}`,
  })
  public toLocation: LocationEntity;

  @AutoMap(() => [StockTransferItemEntity])
  @OneToMany(() => StockTransferItemEntity, (item) => item.stockTransfer)
  public items?: StockTransferItemEntity[];
}
