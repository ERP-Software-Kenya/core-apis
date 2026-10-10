import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileParserService } from './file-parser';
import { CentrifugalService, CentrifugalServiceOptions } from './centrifugal';
import { JwtService } from '@nestjs/jwt';
import { PUSH_NOTIFICATION_SERVICE, PushNotificationService } from './push-notification';
import { PDF_EXPORT_SERVICE, PdfExportService } from './pdf-export';
import { GEMINI_SERVICE, GeminiOptions, GeminiService } from './gemini';
import { QDRANT_SERVICE, QdrantOptions, QdrantService } from './qdrant';
import { ICoreApiConfig } from '../configuration';

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
    {
      provide: GeminiOptions,
      useFactory: (config: ConfigService<ICoreApiConfig>): GeminiOptions => {
        const cfg = config.get<ICoreApiConfig['gemini']>('gemini');
        return new GeminiOptions(cfg.apiKey);
      },
      inject: [ConfigService],
    },
    { provide: GEMINI_SERVICE, useClass: GeminiService },
    GeminiService,
    {
      provide: QdrantOptions,
      useFactory: (config: ConfigService<ICoreApiConfig>): QdrantOptions => {
        const cfg = config.get<ICoreApiConfig['qdrant']>('qdrant');
        return new QdrantOptions(cfg.url, cfg.apiKey, cfg.collection);
      },
      inject: [ConfigService],
    },
    { provide: QDRANT_SERVICE, useClass: QdrantService },
    QdrantService,
  ],
  exports: [
    CentrifugalService,
    PUSH_NOTIFICATION_SERVICE,
    PDF_EXPORT_SERVICE,
    GEMINI_SERVICE,
    GeminiService,
    QDRANT_SERVICE,
    QdrantService,
  ],
})
export class CommonModule {}
