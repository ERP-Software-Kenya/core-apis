import { PinoLogger } from "nestjs-pino";
import { IFileStorage } from "./i-file-storage";
import { IFileSystemStorageOptions } from "./options";
import { existsSync } from "fs";
import { writeFile, readFile, copyFile, unlink } from "fs/promises";
import { join } from "path";
import { platform } from "os";
import { FileNotFoundException, FSException, InvalidFileTypeException, SameFileNamesConflictException } from "./exceptions";
import { FileHelper } from "./file-helper";
import { InjectSentry, SentryService } from "@ntegral/nestjs-sentry";

export abstract class FileSystemStorage implements IFileStorage {
  protected readonly helper: FileHelper;

  constructor(protected readonly options: IFileSystemStorageOptions, protected readonly logger: PinoLogger, @InjectSentry() private readonly sentry: SentryService) {
    this.helper = new FileHelper(options.allowedMimeTypes);
  }

  public async existsAsync(path: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject): void => {
      try {
        const fullPath = this.getFullPath(path);
        resolve(existsSync(fullPath));
      } catch (ex) {
        this.logger.error(ex);
        this.sentryLog(ex);
        reject(new FSException(ex));
      }
    });
  }

  public async readAsync(path: string): Promise<Buffer> {
    const fullPath = this.getFullPath(path);
    if (!(await this.existsAsync(fullPath))) {
      throw new FileNotFoundException(path);
    }
    try {
      const buffer = await readFile(fullPath);
      return buffer;
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new FSException(ex);
    }
  }

  public async writeAsync(path: string, data: Buffer): Promise<string> {
    const type = await this.helper.getExtFromBufferAsync(data);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TYPE", type);
    if (!this.validateType(type?.mime)) {
      throw new InvalidFileTypeException("This file type is invalid __" + type.mime);
    }
    try {
      const f = this.helper.getFileName(path);
      f.location = this.options.folder;
      f.ext = type.ext;
      const fullPath = this.helper.joinPath(f);
      await writeFile(fullPath, data);
      return `${f.fileName}.${f.ext}`;
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new FSException(ex);
    }
  }

  public async replaceAsync(path: string, data: Buffer): Promise<string> {
    const type = await this.helper.getExtFromBufferAsync(data);
    if (!this.validateType(type?.mime)) {
      throw new InvalidFileTypeException("This file type is invalid");
    }
    const { fileName, ext } = this.helper.getFileName(path);
    const result = await this.writeAsync(fileName, data);
    if (type.ext.toLowerCase() !== ext.toLowerCase()) {
      await this.removeAsync(path);
    }
    return result;
  }

  public async copyAsync(srcPath: string, destPath: string): Promise<string> {
    if (this.helper.arePathesEqual(srcPath, destPath, { skipExt: true, ignoreCase: this.isCaseInsensitive() })) {
      throw new SameFileNamesConflictException(`You cant copy file to the same place`);
    }
    if (!(await this.existsAsync(srcPath))) {
      throw new FileNotFoundException(`Source File "${srcPath}" not found`);
    }
    try {
      const src = this.helper.getFileName(srcPath);
      const dest = this.helper.getFileName(destPath);
      srcPath = this.helper.joinPath({
        location: this.options.folder,
        ext: src.ext,
        fileName: src.fileName,
      });
      destPath = this.helper.joinPath({
        location: this.options.folder,
        ext: src.ext,
        fileName: dest.fileName,
      });

      await copyFile(srcPath, destPath);
      return `${dest.fileName}.${dest.ext}`;
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new FSException(ex);
    }
  }

  public async removeAsync(path: string): Promise<boolean> {
    if (!(await this.existsAsync(path))) {
      return false;
    }
    try {
      const f = this.helper.getFileName(path);
      f.location = this.options.folder;
      path = this.helper.joinPath(f);
      await unlink(path);
      return true;
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new FSException(ex);
    }
  }

  protected getFullPath(path: string): string {
    return join(this.options.folder, path);
  }

  protected validateType(mime: string): boolean {
    return this.helper.isAllowedMime(mime);
  }

  private isCaseInsensitive(): boolean {
    const os = platform();
    return os === "darwin" || os === "win32";
  }

  private sentryLog(ex: Error) {
    let error = "";
    if (ex.stack.includes("403")) {
      error = "Invalid token";
    } else if (ex.stack.includes("400")) {
      error = "Invalid bucket";
    }
    this.sentry.error(`S3 Error: ${error}`);
  }
}
