import {
  Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { OrganizationEntity } from './organization.entity';
import { RoleEntity } from './role.entity';
import { LocationEntity } from './location.entity';
import { UserEntity } from './user.entity';

export enum EOrganizationInvitationStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Expired = 'expired',
  Revoked = 'revoked',
  Failed = 'failed',
}

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.OrganizationInvitations })
@Index(['tokenHash'], { unique: true })
export class OrganizationInvitationEntity {
  @PrimaryGeneratedColumn('uuid') public id: string;
  @Column({ name: 'organization_id', type: 'uuid' }) public organizationId: string;
  @Column({ type: 'varchar', length: 320 }) public email: string;
  @Column({ name: 'email_normalized', type: 'varchar', length: 320 }) public emailNormalized: string;
  @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: true }) public firstName?: string;
  @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: true }) public lastName?: string;
  @Column({ name: 'role_id', type: 'uuid' }) public roleId: string;
  @Column({ name: 'location_id', type: 'uuid', nullable: true }) public locationId?: string;
  @Column({ name: 'invited_by_user_id', type: 'uuid' }) public invitedByUserId: string;
  @Column({ name: 'token_hash', type: 'varchar', length: 64 }) public tokenHash: string;
  @Column({ type: 'enum', enum: EOrganizationInvitationStatus, default: EOrganizationInvitationStatus.Pending })
  public status: EOrganizationInvitationStatus;
  @Column({ name: 'expires_at', type: 'timestamp' }) public expiresAt: Date;
  @Column({ name: 'accepted_at', type: 'timestamp', nullable: true }) public acceptedAt?: Date;
  @Column({ name: 'accepted_by_user_id', type: 'uuid', nullable: true }) public acceptedByUserId?: string;
  @Column({ name: 'revoked_at', type: 'timestamp', nullable: true }) public revokedAt?: Date;
  @Column({ name: 'revoked_by_user_id', type: 'uuid', nullable: true }) public revokedByUserId?: string;
  @Column({ name: 'last_sent_at', type: 'timestamp' }) public lastSentAt: Date;
  @Column({ name: 'send_count', type: 'integer', default: 1 }) public sendCount: number;
  @Column({ name: 'failure_reason', type: 'text', nullable: true }) public failureReason?: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) public createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true }) public updatedAt?: Date;

  @ManyToOne(() => OrganizationEntity) @JoinColumn({ name: 'organization_id' }) public organization: OrganizationEntity;
  @ManyToOne(() => RoleEntity) @JoinColumn({ name: 'role_id' }) public role: RoleEntity;
  @ManyToOne(() => LocationEntity, { nullable: true }) @JoinColumn({ name: 'location_id' }) public location?: LocationEntity;
  @ManyToOne(() => UserEntity) @JoinColumn({ name: 'invited_by_user_id' }) public invitedBy: UserEntity;
}
