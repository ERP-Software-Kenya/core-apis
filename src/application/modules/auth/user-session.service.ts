import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClerkService } from "../../../common";
import { EUserSessionStatus, UserEntity, UserSessionEntity } from "../../../infrastructure/persistence/entities";
import { UpsertSessionRequest, UserSessionResponse } from "./models";

@Injectable()
export class UserSessionService {
  constructor(
    @InjectRepository(UserSessionEntity) private readonly sessions: Repository<UserSessionEntity>,
    @InjectRepository(UserEntity) private readonly users: Repository<UserEntity>,
    private readonly clerk: ClerkService,
  ) {}

  public async upsert(userId: string, clerkSessionId: string, request: UpsertSessionRequest, ipAddress?: string, userAgent?: string): Promise<UserSessionResponse> {
    const now = new Date();
    let session = await this.sessions.findOne({ where: { clerkSessionId } });
    const isNew = !session;
    session ??= this.sessions.create({ userId, clerkSessionId, createdAt: now });
    session.userId = userId;
    session.deviceId = request.deviceId;
    session.deviceName = request.deviceName;
    session.platform = request.platform;
    session.appVersion = request.appVersion;
    session.ipAddress = ipAddress;
    session.userAgent = userAgent?.slice(0, 1000);
    session.status = EUserSessionStatus.Active;
    session.lastActiveAt = now;
    session.endedAt = undefined;
    session = await this.sessions.save(session);

    if (isNew) {
      await this.users.update({ id: userId }, { lastLoginAt: now });
    }
    return this.toResponse(session, clerkSessionId);
  }

  public async list(userId: string, currentSessionId: string): Promise<UserSessionResponse[]> {
    const sessions = await this.sessions.find({
      where: { userId },
      order: { lastActiveAt: "DESC" },
      take: 50,
    });
    return sessions.map((session) => this.toResponse(session, currentSessionId));
  }

  public async revoke(userId: string, recordId: string): Promise<void> {
    const session = await this.sessions.findOne({ where: { id: recordId, userId } });
    if (!session) throw new NotFoundException("Session not found");

    await this.clerk.revokeSessionAsync(session.clerkSessionId);
    session.status = EUserSessionStatus.Revoked;
    session.endedAt = new Date();
    await this.sessions.save(session);
  }

  public async endCurrent(userId: string, clerkSessionId: string): Promise<void> {
    const session = await this.sessions.findOne({ where: { userId, clerkSessionId } });
    if (!session) return;
    if (session.status !== EUserSessionStatus.Active) return;
    session.status = EUserSessionStatus.SignedOut;
    session.endedAt = new Date();
    await this.sessions.save(session);
  }

  public async reconcileClerkStatus(clerkSessionId: string, status: EUserSessionStatus): Promise<void> {
    const session = await this.sessions.findOne({ where: { clerkSessionId } });
    if (!session) return;
    if (session.status === EUserSessionStatus.Revoked && status !== EUserSessionStatus.Revoked) return;
    session.status = status;
    session.endedAt = new Date();
    await this.sessions.save(session);
  }

  private toResponse(session: UserSessionEntity, currentSessionId: string): UserSessionResponse {
    return {
      id: session.id,
      deviceId: session.deviceId,
      deviceName: session.deviceName,
      platform: session.platform,
      appVersion: session.appVersion,
      ipAddress: session.ipAddress,
      status: session.status,
      current: session.clerkSessionId === currentSessionId,
      lastActiveAt: session.lastActiveAt,
      endedAt: session.endedAt,
      createdAt: session.createdAt,
    };
  }
}
