import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { StoreEntity } from './store.entity';
import { UserEntity } from './user.entity';

const PK_NAME = 'PK_' + ECoreTableName.Organizations;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Organizations })
export class OrganizationEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, unique: true })
  public name: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public slug?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: true })
  public email?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 20, nullable: true })
  public phone?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public address?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public country?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: true })
  public logoUrl?: string;

  @AutoMap()
  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => Date)
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deletedAt?: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => [StoreEntity])
  @OneToMany(() => StoreEntity, (store) => store.organization)
  public stores?: StoreEntity[];

  @AutoMap(() => [UserEntity])
  @OneToMany(() => UserEntity, (user) => user.organization)
  public users?: UserEntity[];
}
