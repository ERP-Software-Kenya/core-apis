import { ICoreApiConfig } from './i-core-api.config';
import { LogLevel } from '@nestjs/common';

export const configFactory = (): ICoreApiConfig => {
  const env = process.env.NODE_ENV || 'development';
  const isProd = env === 'production';

  return {
    logger: {
      pinoHttp: {
        level: isProd ? 'info' : 'debug',
        transport: isProd
          ? undefined
          : {
              target: 'pino-pretty',
              options: {
                singleLine: true,
              },
            },
      },
    },
    sentry: {
      dsn: process.env.SENTRY_DSN || '',
      debug: !isProd,
      environment: env,
      logLevels: ['error', 'warn'] as LogLevel[],
    },
    api: {
      env,
      domain: process.env.API_DOMAIN || 'http://localhost:3000',
      host: process.env.API_HOST || '0.0.0.0',
      port: parseInt(process.env.PORT || process.env.API_PORT || '3000', 10),
      globalPrefix: process.env.GLOBAL_PREFIX || 'api',
    },
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'core_db',
      sslEnable: process.env.DB_SSL === 'true',
      sslCert: process.env.DB_SSL_CA,
    },
  };
};

export * from './i-api.options';
export * from './i-core-api.config';
