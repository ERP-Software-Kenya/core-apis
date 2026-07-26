import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileParserService } from './file-parser';
import { CentrifugalService, CentrifugalServiceOptions } from './centrifugal';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  providers: [
    {
      provide: CentrifugalServiceOptions,
      useFactory: (config: ConfigService): CentrifugalServiceOptions => {
        return new CentrifugalServiceOptions(
          config.get('CENTRIFUGAL_SECRET_KEY', ''),
          config.get('CENTRIFUGAL_API_KEY', ''),
          config.get('CENTRIFUGAL_API_URL', ''),
        );
      },
      inject: [ConfigService],
    },
    FileParserService,
    CentrifugalService,
    JwtService,
  ],
  exports: [
    CentrifugalService,
  ],
})
export class CommonModule {}
