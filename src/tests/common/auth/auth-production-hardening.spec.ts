import { readFileSync } from "fs";
import { join } from "path";
import { configFactory } from "../../../configuration";

const ROOT = join(__dirname, "../../../");

function source(relativePath: string): string {
  return readFileSync(join(ROOT, relativePath), "utf8").replace(/"/g, "'");
}

describe("production Clerk configuration", () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  it("fails closed when required production authentication settings are missing", () => {
    process.env = { ...originalEnv, NODE_ENV: "production" };
    delete process.env.CLERK_SECRET_KEY;
    delete process.env.CLERK_JWKS_URL;
    delete process.env.CLERK_ISSUER;
    delete process.env.CLERK_AUDIENCE;
    delete process.env.CLERK_AUTHORIZED_PARTIES;

    expect(() => configFactory()).toThrow(/Missing production Clerk configuration/);
  });

  it("normalizes the authorized-party allowlist", () => {
    process.env = {
      ...originalEnv,
      NODE_ENV: "production",
      CLERK_SECRET_KEY: "secret",
      CLERK_JWKS_URL: "https://clerk.example.test/.well-known/jwks.json",
      CLERK_ISSUER: "https://clerk.example.test",
      CLERK_AUDIENCE: "core-apis",
      CLERK_AUTHORIZED_PARTIES: " http://localhost:5173,pramukh://renderer ",
      CLERK_WEBHOOK_SECRET: "whsec_test",
    };

    expect(configFactory().clerk.authorizedParties).toEqual(["http://localhost:5173", "pramukh://renderer"]);
  });
});

describe("Clerk JWT verification source contract", () => {
  const strategy = source("common/auth/strategies/clerk-jwt.strategy.ts");

  it("uses only the configured JWKS, issuer, audience, and RS256 algorithm", () => {
    expect(strategy).toContain("jwksUri: clerkCfg.jwksUrl");
    expect(strategy).toContain("issuer,");
    expect(strategy).toContain("audience: clerkCfg.audience");
    expect(strategy).toContain("algorithms: ['RS256']");
    expect(strategy).not.toContain("extractIssuer(rawToken)");
  });

  it("checks authorized parties, session status, local account status, and active org membership", () => {
    expect(strategy).toContain("clerkCfg.authorizedParties.includes(payload.azp)");
    expect(strategy).toContain("payload.sts !== 'active'");
    expect(strategy).toContain("if (!dbUser.isActive)");
    expect(strategy).toContain("status: 'active'");
    expect(strategy).toContain("organizationId: dbUser.organizationId");
  });
});

describe("development authentication endpoint isolation", () => {
  const controller = source("application/modules/auth/auth.controller.ts");

  it.each([
    ["mobileLogin", "Backend password login"],
    ["devOrganizations", "Organization listing"],
    ["devRoles", "Role listing"],
    ["mobileRegister", "Mobile staff registration"],
  ])("gates %s outside development", (methodName, featureName) => {
    const methodStart = controller.indexOf(`public async ${methodName}`);
    expect(methodStart).toBeGreaterThan(-1);
    const methodBody = controller.slice(methodStart, methodStart + 900);
    expect(methodBody).toContain(`this.assertDevelopmentOnly('${featureName}')`);
  });

  it("uses generic credential errors and activates the global throttler guard", () => {
    const clerkService = source("common/auth/clerk.service.ts");
    const appModule = source("app.module.ts");
    expect(clerkService).toContain("new UnauthorizedException('Invalid email or password')");
    expect(appModule).toContain("{ provide: APP_GUARD, useClass: ThrottlerGuard }");
  });
});
