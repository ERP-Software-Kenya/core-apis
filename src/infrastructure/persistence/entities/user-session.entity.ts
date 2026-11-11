import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CORE_SCHEMA, ECoreTableName } from "./e-core-table-name";

export enum EUserSessionStatus {
  Active = "active",
  Revoked = "revoked",
  SignedOut = "signed_out",
}

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.UserSessions })
@Index("UQ__user_sessions__clerk_session_id", ["clerkSessionId"], { unique: true })
@Index("IDX__user_sessions__user_last_active", ["userId", "lastActiveAt"])
export class UserSessionEntity {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "PK_user_sessions" })
  public id: string;

  @Column({ name: "user_id", type: "uuid" })
  public userId: string;

  @Column({ name: "clerk_session_id", type: "varchar", length: 255 })
  public clerkSessionId: string;

  @Column({ name: "device_id", type: "varchar", length: 255 })
  public deviceId: string;

  @Column({ name: "device_name", type: "varchar", length: 255 })
  public deviceName: string;

  @Column({ type: "varchar", length: 50 })
  public platform: string;

  @Column({ name: "app_version", type: "varchar", length: 50, nullable: true })
  public appVersion?: string;

  @Column({ name: "ip_address", type: "varchar", length: 64, nullable: true })
  public ipAddress?: string;

  @Column({ name: "user_agent", type: "varchar", length: 1000, nullable: true })
  public userAgent?: string;

  @Column({ type: "varchar", length: 20, default: EUserSessionStatus.Active })
  public status: EUserSessionStatus;

  @Column({ name: "last_active_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  public lastActiveAt: Date;

  @Column({ name: "ended_at", type: "timestamp", nullable: true })
  public endedAt?: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
  public updatedAt?: Date;
}
