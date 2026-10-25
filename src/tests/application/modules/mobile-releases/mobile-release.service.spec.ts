import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'node:stream';
import { MobileReleaseService } from '../../../../application/modules/mobile-releases/mobile-release.service';
import { MobileReleaseOptions } from '../../../../application/modules/mobile-releases/mobile-release.types';

const options: MobileReleaseOptions = {
  enabled: true,
  bucket: 'private-releases',
  keyPrefix: 'releases/mobile/android/stable',
  manifestKey: 'releases/mobile/android/stable/latest.json',
  artifactKey: 'releases/mobile/android/stable/latest/erp-app.apk',
  downloadExpirySeconds: 300,
};

const manifest = {
  application: 'erp-app',
  platform: 'android',
  channel: 'stable',
  version: '1.2.3',
  buildNumber: '42',
  sizeBytes: 123456,
  sha256: 'a'.repeat(64),
  publishedAt: '2026-10-25T10:00:00.000Z',
  artifactKey: options.artifactKey,
  gitCommit: 'abc123',
  easBuildId: 'build-id',
};

describe('MobileReleaseService', () => {
  const client = new S3Client({
    endpoint: 'https://s3.us-west-004.backblazeb2.com',
    region: 'us-west-004',
    credentials: { accessKeyId: 'test', secretAccessKey: 'test' },
  });

  afterEach(() => jest.restoreAllMocks());

  it('returns validated metadata without exposing the private object key', async () => {
    jest.spyOn(client, 'send').mockResolvedValue({
      Body: Readable.from([JSON.stringify(manifest)]),
    } as never);
    const service = new MobileReleaseService(client, options);

    await expect(service.getLatest()).resolves.toEqual({
      application: 'erp-app',
      platform: 'android',
      channel: 'stable',
      version: '1.2.3',
      buildNumber: '42',
      sizeBytes: 123456,
      sha256: 'a'.repeat(64),
      publishedAt: '2026-10-25T10:00:00.000Z',
      gitCommit: 'abc123',
      easBuildId: 'build-id',
    });
  });

  it('rejects a manifest that points at a different object', async () => {
    jest.spyOn(client, 'send').mockResolvedValue({
      Body: Readable.from([JSON.stringify({ ...manifest, artifactKey: 'other/app.apk' })]),
    } as never);
    const service = new MobileReleaseService(client, options);

    await expect(service.getLatest()).rejects.toThrow('manifest is invalid');
  });

  it('creates a short-lived signed URL for the fixed latest APK key', async () => {
    jest.spyOn(client, 'send').mockResolvedValue({
      Body: Readable.from([JSON.stringify(manifest)]),
    } as never);
    const service = new MobileReleaseService(client, options);

    const result = await service.createDownload();

    expect(result.url).toContain(options.bucket);
    expect(result.url).toContain('X-Amz-Expires=300');
    expect(new Date(result.expiresAt).getTime()).toBeGreaterThan(Date.now());
    const command = (client.send as jest.Mock).mock.calls[0][0] as GetObjectCommand;
    expect(command.input.Key).toBe(options.manifestKey);
  });

  it('fails closed when private release storage is disabled', async () => {
    const service = new MobileReleaseService(null, { ...options, enabled: false });
    await expect(service.getLatest()).rejects.toThrow('not configured');
  });
});
