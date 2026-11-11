import { readFileSync } from "fs";
import { join } from "path";
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
// should-allow-anonymous imports the whole common barrel (typeorm/ESM deps that jest cannot load here).
jest.mock("../../../../common/auth/guards/should-allow-anonymous", () => ({ shouldAllowAnonymous: () => false }));

import { ClerkAuthGuard } from "../../../../common/auth/guards/clerk-auth.guard";
import { AllowPendingSession } from "../../../../common/auth/decorators";
import { AuthenticatedUser } from "../../../../common/auth/types";

class Probe {
  @AllowPendingSession()
  public allowed(): void {}
  public blocked(): void {}
}

const contextFor = (handler: () => void): ExecutionContext => ({ getHandler: () => handler }) as unknown as ExecutionContext;
const userWith = (sessionStatus: "active" | "pending"): AuthenticatedUser => Object.assign(new AuthenticatedUser(), { clerkUserId: "user_1", clerkSessionId: "sess_1", sessionStatus });

describe("ClerkAuthGuard pending-session handling", () => {
  const guard = new ClerkAuthGuard(new Reflector());
  const probe = new Probe();

  it("lets an active session through any route", () => {
    const user = userWith("active");
    expect(guard.handleRequest(null as never, user, undefined, contextFor(probe.blocked))).toBe(user);
  });

  it("lets a pending session reach @AllowPendingSession routes", () => {
    const user = userWith("pending");
    expect(guard.handleRequest(null as never, user, undefined, contextFor(probe.allowed))).toBe(user);
  });

  it("rejects a pending session elsewhere with the SESSION_PENDING code", () => {
    try {
      guard.handleRequest(null as never, userWith("pending"), undefined, contextFor(probe.blocked));
      fail("expected rejection");
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect((error as UnauthorizedException).getResponse()).toMatchObject({ code: "SESSION_PENDING" });
    }
  });
});

describe("pending-session allowlist contract", () => {
  // Pending sessions bypass the org requirement, so the set of routes they may reach is pinned here.
  // Adding a route to this list is a deliberate security decision and must be reviewed.
  const ALLOWED = ["sync", "organizations", "me", "sessions/current/end"];

  it("only the onboarding endpoints opt in to @AllowPendingSession", () => {
    const root = join(__dirname, "../../../../");
    const offenders: string[] = [];
    const walk = (dir: string): void => {
      for (const entry of require("fs").readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.name.endsWith(".controller.ts")) {
          const src = readFileSync(full, "utf8");
          for (const match of src.matchAll(/@AllowPendingSession\(\)\s*@(?:Get|Post|Put|Patch|Delete)\("([^"]*)"\)/g)) {
            if (!ALLOWED.includes(match[1]) || !full.endsWith("auth.controller.ts")) offenders.push(`${entry.name}: ${match[1]}`);
          }
        }
      }
    };
    walk(join(root, "application"));
    expect(offenders).toEqual([]);
  });

  it("every allowlisted route is actually decorated", () => {
    const src = readFileSync(join(__dirname, "../../../../application/modules/auth/auth.controller.ts"), "utf8");
    for (const path of ALLOWED) expect(src).toMatch(new RegExp(`@AllowPendingSession\\(\\)\\s*@(?:Get|Post)\\("${path}"\\)`));
  });
});
