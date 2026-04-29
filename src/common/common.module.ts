import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService, RedisOptions } from './redis';
import { FileParserService } from './file-parser';
import { CentrifugalService, CentrifugalServiceOptions } from './centrifugal';
import { JwtService } from '@nestjs/jwt';

import { isNilOrEmpty } from './utils';

@Global()
@Module({
  providers: [
    {
      provide: RedisOptions,
      useFactory: () => {
        return new RedisOptions(
          process.env?.BULL_REDIS_HOST,
          process.env?.BULL_REDIS_USERNAME,
          process.env?.BULL_REDIS_PASSWORD,
          parseInt(process.env?.BULL_REDIS_PORT),
          !isNilOrEmpty(process.env?.BULL_REDIS_TRANSPORT) ? process.env?.BULL_REDIS_TRANSPORT : "redis",
          parseInt(process.env?.BULL_REDIS_MAX_RECONNECTION_ATTEMPTS),
          parseInt(process.env?.BULL_REDIS_RECONNECTION_DELAY_IN_MS),
          !isNilOrEmpty(process.env?.BULL_REDIS_CONNECTION_NAME) ? process.env?.BULL_REDIS_CONNECTION_NAME : "core-apis",
        );
      },
    },
    {
      provide: CentrifugalServiceOptions,
      useFactory: (config: ConfigService) => {
        return new CentrifugalServiceOptions(
          config.get('CENTRIFUGAL_SECRET_KEY', ''),
          config.get('CENTRIFUGAL_API_KEY', ''),
          config.get('CENTRIFUGAL_API_URL', ''),
        );
      },
      inject: [ConfigService],
    },
    RedisService,
    FileParserService,
    CentrifugalService,
    JwtService,
  ],
  exports: [
    RedisService,
    FileParserService,
    CentrifugalService,
  ],
})
export class CommonModule {}
