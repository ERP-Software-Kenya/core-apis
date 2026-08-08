import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'core', name: 'page_access_configs' })
export class PageAccessEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true, name: 'page_key', length: 100 })
  public pageKey: string;

  @Column({ type: 'simple-array', name: 'allowed_roles', default: '' })
  public allowedRoles: string[];

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}
