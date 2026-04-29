import {
  CompleteMultipartUploadCommand,
  CopyObjectCommand,
  CreateMultipartUploadCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
  UploadPartCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PinoLogger } from "nestjs-pino";
import { isNilOrEmpty } from "..";
import { FileNotFoundException, InvalidFileTypeException, S3Exception, SameFileNamesConflictException } from "./exceptions";
import { Readable } from "stream";
import { IFileStorage } from "./i-file-storage";
import { IFileUrlResolver } from "./i-file-url.resolver";
import { FileHelper } from "./file-helper";
import { IS3StorageOptions } from "./options";
import { EAttachmentMimeType } from "../types";
import { InjectSentry, SentryService } from "@ntegral/nestjs-sentry";
import { createHash } from "crypto";

const EXPIRATION_MS = 604800;

export abstract class S3FileStorage implements IFileStorage, IFileUrlResolver {
  protected readonly client: S3Client;
  protected readonly helper: FileHelper;

  constructor(
    protected readonly storageOptions: IS3StorageOptions,
    protected readonly logger: PinoLogger,
    @InjectSentry() protected readonly sentry: SentryService,
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

  public async existsAsync(path: string): Promise<boolean> {
    try {
      const res = await this.client.send(
        new HeadObjectCommand({
          Bucket: this.storageOptions.bucket,
          Key: path,
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

  public async readAsync(path: string): Promise<Buffer> {
    if (!(await this.existsAsync(path))) {
      return null;
    }
    try {
      const getCmd = new GetObjectCommand({
        Bucket: this.storageOptions.bucket,
        Key: path,
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

  public async writeAsync(path: string, data: Buffer, contentType: string = null): Promise<string> {
    const md5Hash = createHash("md5").update(data).digest("base64");
    const type = await this.helper.getExtFromBufferAsync(data);

    console.log("))))))))))))))))))))))))) TYPE", type);
    if (!this.validateType(type?.mime)) {
      throw new InvalidFileTypeException("This file type is invalid");
    }
    try {
      const fileName = this.helper.getFileName(path);
      fileName.ext = type.ext;
      path = this.helper.joinPath(fileName);
      const startCmd = new CreateMultipartUploadCommand({
        Bucket: this.storageOptions.bucket,
        Key: path,
        ContentType: isNilOrEmpty(contentType) ? type.mime : contentType,
      });
      const { UploadId: uploadId } = await this.client.send(startCmd);

      const uploadCmd = new UploadPartCommand({
        Bucket: this.storageOptions.bucket,
        Key: path,
        Body: data,
        PartNumber: 1,
        UploadId: uploadId,
        ContentMD5: md5Hash, // Required when Object Lock is enabled
      });
      const partRes = await this.client.send(uploadCmd);
      const finishCmd = new CompleteMultipartUploadCommand({
        Bucket: this.storageOptions.bucket,
        Key: path,
        UploadId: uploadId,
        MultipartUpload: { Parts: [{ PartNumber: 1, ETag: partRes.ETag }] },
      });
      const fRes = await this.client.send(finishCmd);
      return fRes.Key;
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new S3Exception(ex);
    }
  }

  public async replaceAsync(path: string, data: Buffer): Promise<string> {
    const type = await this.helper.getExtFromBufferAsync(data);
    if (!this.validateType(type?.mime)) {
      throw new InvalidFileTypeException("This file type is invalid");
    }
    const fileName = this.helper.getFileName(path);
    fileName.ext = type.ext;
    const substitutedPath = this.helper.joinPath(fileName);
    const result = await this.writeAsync(substitutedPath, data);
    if (type.ext.toLowerCase() !== fileName.ext.toLowerCase()) {
      await this.removeAsync(path);
    }
    return result;
  }

  public async copyAsync(srcPath: string, destPath: string): Promise<string> {
    if (this.helper.arePathesEqual(srcPath, destPath, { skipExt: true })) {
      throw new SameFileNamesConflictException(`You cant copy file to the same place`);
    }
    if (!(await this.existsAsync(srcPath))) {
      throw new FileNotFoundException(`Source File "${srcPath}" not found`);
    }
    try {
      const src = this.helper.getFileName(srcPath);
      const dest = this.helper.getFileName(destPath);
      destPath = this.helper.joinPath({
        location: dest.location,
        ext: src.ext,
        fileName: dest.fileName,
      });

      const copyCmd = new CopyObjectCommand({
        Bucket: this.storageOptions.bucket,
        CopySource: srcPath,
        Key: destPath,
      });

      await this.client.send(copyCmd);
      return destPath;
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new S3Exception(ex);
    }
  }

  public async removeAsync(path: string, bucketOptions?: IS3StorageOptions): Promise<boolean> {
    if (!(await this.existsAsync(path))) {
      return false;
    }
    try {
      const removeCmd = new DeleteObjectCommand({
        Bucket: bucketOptions?.bucket ?? this.storageOptions.bucket,
        Key: path,
      });
      await this.client.send(removeCmd);
      return true;
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new S3Exception(ex);
    }
  }

  public async getUrlAsync(path: string): Promise<string> {
    try {
      return this.isPublic ? await this.getSimpleUrlAsync(path) : await this.getSignedUrlAsync(path);
    } catch (ex) {
      this.logger.error(ex);
      return null;
    }
  }

  public async getSignedUrlAsync(path: string): Promise<string> {
    if (!(await this.existsAsync(path))) {
      return null;
    }
    try {
      return await getSignedUrl(
        this.client,
        new GetObjectCommand({
          Bucket: this.storageOptions.bucket,
          Key: path,
        }),
        { expiresIn: EXPIRATION_MS },
      );
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new S3Exception(ex);
    }
  }

  public async getSimpleUrlAsync(path: string): Promise<string> {
    if (!(await this.existsAsync(path))) {
      return null;
    }
    const url = new URL(`https://${this.storageOptions.bucket}.s3.${this.storageOptions.region}.amazonaws.com/${path}`);
    url.searchParams.append("x-id", "GetObject");
    return url.toString();
  }

  public async generateUploadUrlAsync(path: string, mimeType: EAttachmentMimeType, expirationTime?: number, metadata?: Record<string, string>): Promise<string> {
    const command = new PutObjectCommand({ Bucket: this.storageOptions.bucket, Key: path, ContentType: mimeType, Metadata: { ...metadata } });
    return getSignedUrl(this.client, command, { expiresIn: expirationTime ?? EXPIRATION_MS });
  }

  public async copyBetweenBucketsAsync(sourceBucket: string, sourceKey: string, destinationBucket: string, destinationKey: string): Promise<string> {
    try {
      const copyCmd = new CopyObjectCommand({
        Bucket: destinationBucket,
        CopySource: `${sourceBucket}/${sourceKey}`,
        Key: destinationKey,
      });
      await this.client.send(copyCmd);
      return destinationKey;
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
}
