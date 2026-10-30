import { ICoreApiConfig } from "./i-core-api.config";
import { LogLevel } from "@nestjs/common";
export * from "./i-clerk.options";

export const configFactory = (): ICoreApiConfig => {
  const env = process.env.NODE_ENV || "development";
  const isProd = env === "production";
  const clerkAuthorizedParties = (process.env.CLERK_AUTHORIZED_PARTIES || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (isProd) {
    const requiredClerkSettings = [
      ["CLERK_SECRET_KEY", process.env.CLERK_SECRET_KEY],
      ["CLERK_JWKS_URL", process.env.CLERK_JWKS_URL],
      ["CLERK_ISSUER", process.env.CLERK_ISSUER],
      ["CLERK_AUDIENCE", process.env.CLERK_AUDIENCE],
      ["CLERK_AUTHORIZED_PARTIES", clerkAuthorizedParties.length ? "configured" : undefined],
      ["CLERK_WEBHOOK_SECRET", process.env.CLERK_WEBHOOK_SECRET],
    ]
      .filter(([, value]) => !value)
      .map(([name]) => name);
    if (requiredClerkSettings.length) {
      throw new Error(`Missing production Clerk configuration: ${requiredClerkSettings.join(", ")}`);
    }
  }

  return {
    logger: {
      pinoHttp: {
        level: isProd ? "info" : "debug",
        transport: isProd
          ? undefined
          : {
              target: "pino-pretty",
              options: {
                singleLine: true,
              },
            },
      },
    },
    sentry: {
      dsn: process.env.SENTRY_DSN || "",
      debug: !isProd,
      environment: env,
      logLevels: ["error", "warn"] as LogLevel[],
    },
    api: {
      env,
      domain: process.env.API_DOMAIN || "http://localhost:3000",
      host: process.env.API_HOST || "0.0.0.0",
      port: parseInt(process.env.PORT || process.env.API_PORT || "3000", 10),
      globalPrefix: process.env.GLOBAL_PREFIX || "api",
      trustProxyHops: parseInt(process.env.API_TRUST_PROXY_HOPS || "0", 10),
    },
    database: {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432", 10),
      username: process.env.DB_USER || "postgres",
      password: process.env.DB_PASS || "postgres",
      database: process.env.DB_NAME || "core_db",
      sslEnable: process.env.DB_SSL === "true",
      sslCert: process.env.DB_SSL_CA,
    },
    clerk: {
      secretKey: process.env.CLERK_SECRET_KEY || "",
      jwksUrl: process.env.CLERK_JWKS_URL || "",
      issuer: process.env.CLERK_ISSUER || "",
      audience: process.env.CLERK_AUDIENCE || undefined,
      authorizedParties: clerkAuthorizedParties,
      webhookSecret: process.env.CLERK_WEBHOOK_SECRET || "",
    },
    mail: {
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.MAIL_PORT || "587", 10),
      secure: process.env.MAIL_SECURE === "true",
      user: process.env.MAIL_USER || "",
      password: process.env.MAIL_PASSWORD || "",
      from: process.env.MAIL_FROM || "noreply@erp.local",
    },
    gemini: {
      apiKey: process.env.GEMINI_API_KEY || "",
    },
    qdrant: {
      url: process.env.QDRANT_URL || "http://localhost:6333",
      apiKey: process.env.QDRANT_API_KEY || "",
      collection: process.env.QDRANT_COLLECTION || "erp-knowledge",
    },
  };
};

export * from "./i-api.options";
export * from "./i-core-api.config";
