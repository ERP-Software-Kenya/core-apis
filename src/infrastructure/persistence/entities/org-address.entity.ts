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
import { OrganizationEntity } from './organization.entity';

const PK_NAME = 'PK_' + ECoreTableName.OrgAddresses;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.OrgAddresses })
export class OrgAddressEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'org_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, default: 'office' })
  public type: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  public line1: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: true })
  public line2?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public city: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public state?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public country: string;

  @AutoMap()
  @Column({ name: 'postal_code', type: 'varchar', length: 20 })
  public postalCode: string;

  @AutoMap()
  @Column({ name: 'is_primary', type: 'boolean', default: false })
  public isPrimary: boolean;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'org_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.OrgAddresses}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;
}
