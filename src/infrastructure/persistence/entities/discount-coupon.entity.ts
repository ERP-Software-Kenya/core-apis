import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { OrganizationEntity } from './organization.entity';

const PK_NAME = 'PK_' + ECoreTableName.DiscountCoupons;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.DiscountCoupons })
@Index(['organizationId', 'code'], { unique: true })
export class DiscountCouponEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'org_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50 })
  public code: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 20, default: 'percentage' })
  public type: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public value: number;

  @AutoMap()
  @Column({ name: 'max_uses', type: 'integer', nullable: true })
  public maxUses?: number;

  @AutoMap()
  @Column({ name: 'used_count', type: 'integer', default: 0 })
  public usedCount: number;

  @AutoMap(() => Date)
  @Column({ name: 'valid_from', type: 'timestamp', nullable: true })
  public validFrom?: Date;

  @AutoMap(() => Date)
  @Column({ name: 'valid_until', type: 'timestamp', nullable: true })
  public validUntil?: Date;

  @AutoMap()
  @Column({ name: 'is_active', type: 'boolean', default: true })
  public isActive: boolean;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'org_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.DiscountCoupons}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;
}
