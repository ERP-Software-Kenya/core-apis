import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { Readable } from 'node:stream';
import {
  MOBILE_RELEASE_OPTIONS,
  MOBILE_RELEASE_S3,
  MobileReleaseDownload,
  MobileReleaseManifest,
  MobileReleaseMetadata,
  MobileReleaseOptions,
  MobileReleaseS3Client,
} from './mobile-release.types';

@Injectable()
export class MobileReleaseService {
  constructor(
    @Inject(MOBILE_RELEASE_S3) private readonly client: MobileReleaseS3Client,
    @Inject(MOBILE_RELEASE_OPTIONS) private readonly options: MobileReleaseOptions,
  ) {}

  public async getLatest(): Promise<MobileReleaseMetadata> {
    const client = this.configuredClient();
    let response;
    try {
      response = await client.send(new GetObjectCommand({
        Bucket: this.options.bucket,
        Key: this.options.manifestKey,
      }));
    } catch (error: unknown) {
      const status = this.statusCode(error);
      if (status === 404 || (error instanceof Error && (error.name === 'NoSuchKey' || error.name === 'NotFound'))) {
        throw new NotFoundException('No Android release has been published');
      }
      throw new ServiceUnavailableException('The Android release service is temporarily unavailable');
    }

    if (!response.Body) throw new NotFoundException('No Android release has been published');

    let parsed: unknown;
    try {
      parsed = JSON.parse(await this.readBody(response.Body as Readable));
    } catch {
      throw new ServiceUnavailableException('The Android release manifest is invalid');
    }

    const manifest = this.validateManifest(parsed);
    const { artifactKey: _privateStorageKey, ...metadata } = manifest;
    return metadata;
  }

  public async createDownload(): Promise<MobileReleaseDownload> {
    const client = this.configuredClient();
    await this.getLatest();
    let url: string;
    try {
      url = await getSignedUrl(
        client,
        new GetObjectCommand({
          Bucket: this.options.bucket,
          Key: this.options.artifactKey,
          ResponseContentDisposition: 'attachment; filename="erp-app.apk"',
          ResponseContentType: 'application/vnd.android.package-archive',
        }),
        { expiresIn: this.options.downloadExpirySeconds },
      );
    } catch {
      throw new ServiceUnavailableException('Unable to create the Android download link');
    }
    return {
      url,
      expiresAt: new Date(Date.now() + this.options.downloadExpirySeconds * 1_000).toISOString(),
    };
  }

  private configuredClient(): S3Client {
    if (!this.options.enabled || !this.client) {
      throw new ServiceUnavailableException('Mobile releases are not configured');
    }
    return this.client;
  }

  private validateManifest(value: unknown): MobileReleaseManifest {
    if (!value || typeof value !== 'object') {
      throw new ServiceUnavailableException('The Android release manifest is invalid');
    }
    const manifest = value as Partial<MobileReleaseManifest>;
    const publishedAt = typeof manifest.publishedAt === 'string' ? Date.parse(manifest.publishedAt) : NaN;
    if (
      manifest.application !== 'erp-app' ||
      manifest.platform !== 'android' ||
      typeof manifest.channel !== 'string' || !manifest.channel.trim() ||
      typeof manifest.version !== 'string' || !manifest.version.trim() ||
      typeof manifest.buildNumber !== 'string' || !manifest.buildNumber.trim() ||
      typeof manifest.sizeBytes !== 'number' || !Number.isSafeInteger(manifest.sizeBytes) || manifest.sizeBytes <= 0 ||
      typeof manifest.sha256 !== 'string' || !/^[a-f0-9]{64}$/i.test(manifest.sha256) ||
      !Number.isFinite(publishedAt) ||
      manifest.artifactKey !== this.options.artifactKey
    ) {
      throw new ServiceUnavailableException('The Android release manifest is invalid');
    }
    return manifest as MobileReleaseManifest;
  }

  private async readBody(stream: Readable): Promise<string> {
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString('utf8');
  }

  private statusCode(error: unknown): number | undefined {
    if (!error || typeof error !== 'object') return undefined;
    return (error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode;
  }
}
