import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';

const PK_NAME = 'PK_' + ECoreTableName.Permissions;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Permissions })
export class PermissionEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, unique: true })
  public name: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public resource: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50 })
  public action: string;
}
