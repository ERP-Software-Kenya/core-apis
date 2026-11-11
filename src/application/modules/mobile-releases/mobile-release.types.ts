import { S3Client } from '@aws-sdk/client-s3';

export const MOBILE_RELEASE_OPTIONS = Symbol('MOBILE_RELEASE_OPTIONS');
export const MOBILE_RELEASE_S3 = Symbol('MOBILE_RELEASE_S3');

export interface MobileReleaseOptions {
  enabled: boolean;
  bucket: string;
  keyPrefix: string;
  manifestKey: string;
  artifactKey: string;
  downloadExpirySeconds: number;
}

export type MobileReleaseS3Client = S3Client | null;

export interface MobileReleaseManifest {
  application: 'erp-app';
  platform: 'android';
  channel: string;
  version: string;
  buildNumber: string;
  sizeBytes: number;
  sha256: string;
  publishedAt: string;
  artifactKey: string;
  gitCommit?: string | null;
  easBuildId?: string | null;
}

export type MobileReleaseMetadata = Omit<MobileReleaseManifest, 'artifactKey'>;

export interface MobileReleaseDownload {
  url: string;
  expiresAt: string;
}
