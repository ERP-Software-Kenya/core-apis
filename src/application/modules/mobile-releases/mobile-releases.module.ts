import { S3Client } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MobileReleaseService } from './mobile-release.service';
import { MobileReleasesController } from './mobile-releases.controller';
import { MOBILE_RELEASE_OPTIONS, MOBILE_RELEASE_S3, MobileReleaseOptions } from './mobile-release.types';

const trimSlashes = (value: string): string => value.replace(/^\/+|\/+$/g, '');

@Module({
  controllers: [MobileReleasesController],
  providers: [
    {
      provide: MOBILE_RELEASE_OPTIONS,
      inject: [ConfigService],
      useFactory: (config: ConfigService): MobileReleaseOptions => {
        const keyPrefix = trimSlashes(config.get<string>('MOBILE_RELEASE_STORAGE_KEY_PREFIX', 'releases/mobile/android/stable'));
        const configuredExpiry = Number(config.get<string>('MOBILE_RELEASE_DOWNLOAD_URL_EXPIRY_SECONDS', '300'));
        return {
          enabled: config.get<string>('MOBILE_RELEASES_ENABLED', 'false') === 'true',
          bucket: config.get<string>('MOBILE_RELEASE_STORAGE_BUCKET', ''),
          keyPrefix,
          manifestKey: `${keyPrefix}/latest.json`,
          artifactKey: `${keyPrefix}/latest/erp-app.apk`,
          downloadExpirySeconds: Number.isFinite(configuredExpiry)
            ? Math.min(900, Math.max(60, Math.trunc(configuredExpiry)))
            : 300,
        };
      },
    },
    {
      provide: MOBILE_RELEASE_S3,
      inject: [ConfigService, MOBILE_RELEASE_OPTIONS],
      useFactory: (config: ConfigService, options: MobileReleaseOptions): S3Client | null => {
        if (!options.enabled) return null;
        const endpoint = config.get<string>('MOBILE_RELEASE_STORAGE_ENDPOINT', '');
        const region = config.get<string>('MOBILE_RELEASE_STORAGE_REGION', '');
        const accessKeyId = config.get<string>('MOBILE_RELEASE_STORAGE_ACCESS_KEY_ID', '');
        const secretAccessKey = config.get<string>('MOBILE_RELEASE_STORAGE_SECRET_ACCESS_KEY', '');
        if (!endpoint.startsWith('https://') || !region || !accessKeyId || !secretAccessKey || !options.bucket || !options.keyPrefix) {
          return null;
        }
        return new S3Client({
          endpoint,
          region,
          credentials: { accessKeyId, secretAccessKey },
        });
      },
    },
    MobileReleaseService,
  ],
})
export class MobileReleasesModule {}
