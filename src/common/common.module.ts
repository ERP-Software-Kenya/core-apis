import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileParserService } from './file-parser';
import { CentrifugalService, CentrifugalServiceOptions } from './centrifugal';
import { JwtService } from '@nestjs/jwt';
import { MAIL_SERVICE, MailService, MailOptions } from './mail';
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
    {
      provide: MailOptions,
      useFactory: (config: ConfigService): MailOptions => {
        return new MailOptions(
          config.get('MAIL_HOST', 'smtp.gmail.com'),
          parseInt(config.get('MAIL_PORT', '587'), 10),
          config.get('MAIL_SECURE', 'false') === 'true',
          config.get('MAIL_USER', ''),
          config.get('MAIL_PASSWORD', ''),
          config.get('MAIL_FROM', 'noreply@erp.local'),
        );
      },
      inject: [ConfigService],
    },
    { provide: MAIL_SERVICE, useClass: MailService },
    { provide: PUSH_NOTIFICATION_SERVICE, useClass: PushNotificationService },
    { provide: PDF_EXPORT_SERVICE, useClass: PdfExportService },
    FileParserService,
    CentrifugalService,
    JwtService,
  ],
  exports: [
    CentrifugalService,
    MAIL_SERVICE,
    PUSH_NOTIFICATION_SERVICE,
    PDF_EXPORT_SERVICE,
  ],
})
export class CommonModule {}
