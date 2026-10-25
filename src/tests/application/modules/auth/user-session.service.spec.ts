import { NotFoundException } from "@nestjs/common";

jest.mock("@automapper/classes", () => ({ AutoMap: () => () => undefined }));
jest.mock("../../../../common", () => ({ ClerkService: class ClerkService {} }));

import { EUserSessionStatus, UserSessionEntity } from "../../../../infrastructure/persistence/entities";
import { UserSessionService } from "../../../../application/modules/auth/user-session.service";

describe("UserSessionService", () => {
  const now = new Date("2026-10-25T10:00:00Z");
  const record: UserSessionEntity = {
    id: "record-1",
    userId: "user-1",
    clerkSessionId: "sess_1",
    deviceId: "device-123",
    deviceName: "Desktop",
    platform: "windows",
    status: EUserSessionStatus.Active,
    lastActiveAt: now,
    createdAt: now,
  };

  function setup(found: UserSessionEntity | null = record) {
    const sessions = {
      findOne: jest.fn().mockResolvedValue(found),
      find: jest.fn().mockResolvedValue(found ? [found] : []),
      create: jest.fn((value) => value),
      save: jest.fn(async (value) => ({ ...value, id: value.id ?? "new-id", createdAt: value.createdAt ?? now })),
    };
    const users = { update: jest.fn() };
    const clerk = { revokeSessionAsync: jest.fn() };
    return {
      service: new UserSessionService(sessions as never, users as never, clerk as never),
      sessions,
      users,
      clerk,
    };
  }

  it("lists only records selected for the authenticated user and marks the current Clerk session", async () => {
    const { service, sessions } = setup();
    const result = await service.list("user-1", "sess_1");
    expect(sessions.find).toHaveBeenCalledWith(expect.objectContaining({ where: { userId: "user-1" }, take: 50 }));
    expect(result[0]).toMatchObject({ id: "record-1", current: true, deviceName: "Desktop" });
    expect(result[0]).not.toHaveProperty("clerkSessionId");
    expect(result[0]).not.toHaveProperty("userAgent");
  });

  it("cannot revoke a session record owned by another account", async () => {
    const { service, clerk } = setup(null);
    await expect(service.revoke("other-user", "record-1")).rejects.toBeInstanceOf(NotFoundException);
    expect(clerk.revokeSessionAsync).not.toHaveBeenCalled();
  });

  it("revokes Clerk before marking the owned database record revoked", async () => {
    const { service, clerk, sessions } = setup();
    await service.revoke("user-1", "record-1");
    expect(clerk.revokeSessionAsync).toHaveBeenCalledWith("sess_1");
    expect(sessions.save).toHaveBeenCalledWith(expect.objectContaining({ status: EUserSessionStatus.Revoked }));
  });
});
