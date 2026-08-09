import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileParserService } from './file-parser';
import { CentrifugalService, CentrifugalServiceOptions } from './centrifugal';
import { JwtService } from '@nestjs/jwt';
import { PUSH_NOTIFICATION_SERVICE, PushNotificationService } from './push-notification';
import { PDF_EXPORT_SERVICE, PdfExportService } from './pdf-export';

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
    { provide: PUSH_NOTIFICATION_SERVICE, useClass: PushNotificationService },
    { provide: PDF_EXPORT_SERVICE, useClass: PdfExportService },
    FileParserService,
    CentrifugalService,
    JwtService,
  ],
  exports: [
    CentrifugalService,
    PUSH_NOTIFICATION_SERVICE,
    PDF_EXPORT_SERVICE,
  ],
})
export class CommonModule {}
