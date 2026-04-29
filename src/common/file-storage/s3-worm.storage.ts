import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isNilOrEmpty } from "..";
import { InjectSentry, SentryService } from "@ntegral/nestjs-sentry";
import { createHash } from "crypto";
import { PinoLogger } from "nestjs-pino";
import { InvalidFileTypeException, S3Exception } from "./exceptions"; // Adjust path
import { FileHelper } from "./file-helper";
import { IWormFileUrlResolver } from "./i-worm-file-url.resolver";
import { IWormFileStorage } from "./i-worm-file.storage";
import { IS3StorageOptions } from "./options";
import { IWormFile } from "./types";
import { Readable } from "stream";

const EXPIRATION_MS = 604800;

export abstract class S3WormStorage implements IWormFileStorage, IWormFileUrlResolver {
  protected readonly client: S3Client;
  protected readonly helper: FileHelper;

  constructor(
    protected readonly storageOptions: IS3StorageOptions,
    protected readonly logger: PinoLogger,
    @InjectSentry() private readonly sentry: SentryService,
    allowedMimeTypes?: string[],
  ) {
    this.client = new S3Client({
      credentials: {
        accessKeyId: storageOptions.accessKeyId,
        secretAccessKey: storageOptions.secretAccessKey,
      },
      region: storageOptions.region,
    });
    this.helper = new FileHelper(allowedMimeTypes);
  }
  public abstract get isPublic(): boolean;

  public async existsAsync(path: string, versionId?: string): Promise<boolean> {
    try {
      const res = await this.client.send(
        new HeadObjectCommand({
          Bucket: this.storageOptions.bucket,
          Key: path,
          ...(versionId ? { VersionId: versionId } : {}),
        }),
      );
      return !isNilOrEmpty(res);
    } catch (ex) {
      if (ex.code === "NotFound" || ex.name === "NotFound") {
        return false;
      }
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new S3Exception(ex);
    }
  }
  public async writeAsync(path: string, data: Buffer, contentType: string = null): Promise<IWormFile> {
    const md5Hash = createHash("md5").update(data).digest("base64");
    const type = await this.helper.getExtFromBufferAsync(data);

    if (!this.validateType(type?.mime)) {
      throw new InvalidFileTypeException("This file type is invalid");
    }

    try {
      const fileName = this.helper.getFileName(path);
      fileName.ext = type.ext;
      path = this.helper.joinPath(fileName);

      const cmd = new PutObjectCommand({
        Bucket: this.storageOptions.bucket,
        Key: path,
        Body: data,
        ContentType: isNilOrEmpty(contentType) ? type.mime : contentType,
        ContentMD5: md5Hash,
      });

      const putRes = await this.client.send(cmd);
      return {
        path,
        versionId: putRes.VersionId,
      };
    } catch (err) {
      this.logger.error(err);
      this.sentryLog(err);
      throw new S3Exception(err);
    }
  }

  public async getUrlAsync(path: string, versionId?: string): Promise<string> {
    try {
      return this.isPublic ? await this.getSimpleUrlAsync(path, versionId) : await this.getSignedUrlAsync(path, versionId);
    } catch (ex) {
      this.logger.error(ex);
      return null;
    }
  }

  public async readAsync(path: string, versionId?: string): Promise<Buffer> {
    if (!(await this.existsAsync(path))) {
      return null;
    }
    try {
      const getCmd = new GetObjectCommand({
        Bucket: this.storageOptions.bucket,
        Key: path,
        ...(versionId ? { VersionId: versionId } : {}),
      });
      const res = await this.client.send(getCmd);
      const stream = res.Body as Readable;
      return await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.once("end", () => {
          resolve(Buffer.concat(chunks));
        });
        stream.once("error", reject);
      });
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new S3Exception(ex);
    }
  }

  protected validateType(mime: string): boolean {
    return this.helper.isAllowedMime(mime);
  }
  protected sentryLog(ex: Error): void {
    let error = "";
    if (ex.stack.includes("403")) {
      error = "Invalid token";
    } else if (ex.stack.includes("400")) {
      error = "Invalid bucket";
    }
    this.sentry.error(`S3 Error: ${error}`);
  }

  private async getSignedUrlAsync(path: string, versionId?: string): Promise<string> {
    if (!(await this.existsAsync(path))) {
      return null;
    }

    try {
      const cmd = new GetObjectCommand({
        Bucket: this.storageOptions.bucket,
        Key: path,
        ...(versionId ? { VersionId: versionId } : {}),
      });

      return await getSignedUrl(this.client, cmd, { expiresIn: EXPIRATION_MS });
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new S3Exception(ex);
    }
  }

  private async getSimpleUrlAsync(path: string, versionId?: string): Promise<string> {
    this.logger.info("[S3_WORM_STORAGE] override getSimpleUrlAsync");
    if (!(await this.existsAsync(path))) {
      return null;
    }

    const url = new URL(`https://${this.storageOptions.bucket}.s3.${this.storageOptions.region}.amazonaws.com/${path}`);
    url.searchParams.append("x-id", "GetObject");
    if (versionId) {
      url.searchParams.append("versionId", versionId);
    }
    return url.toString();
  }
}
