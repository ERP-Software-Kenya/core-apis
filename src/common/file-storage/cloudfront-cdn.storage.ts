import { InjectSentry, SentryService } from "@ntegral/nestjs-sentry";
import { PinoLogger } from "nestjs-pino";
import { FileHelper } from "./file-helper";
import { ICloudFrontCdnOptions } from "./options";
import { ICloudFrontCdnStorage } from "./i-cloudfront-cdn.storage";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import axios, { AxiosError } from "axios";
import { CloudFrontCdnException, CloudFrontOptionNotFoundException } from "./exceptions";
import { ICloudFrontQueryParams } from "./types";
import { URL_TTL_FOR_DATE_LESS_THAN } from "../auth";

export abstract class CloudFrontCdnStorage implements ICloudFrontCdnStorage {
  protected readonly helper: FileHelper;

  constructor(
    protected readonly options: ICloudFrontCdnOptions,
    protected readonly logger: PinoLogger,
    @InjectSentry() private readonly sentry: SentryService,
    allowedMimeTypes?: string[],
  ) {
    this.helper = new FileHelper(allowedMimeTypes);
  }

  public abstract get isPublic(): boolean;

  public async readCloudFrontAsync(path: string, query?: ICloudFrontQueryParams[]): Promise<string> {
    try {
      const { cdnUrl, keyPairId, privateKey, urlTTL } = this.options;
      const dateLessThan = urlTTL ? urlTTL : URL_TTL_FOR_DATE_LESS_THAN; // 1 hour in seconds

      if (!cdnUrl || !keyPairId || !privateKey) {
        throw new CloudFrontOptionNotFoundException("CloudFront environment variables not properly configured");
      }

      // Build URL
      const baseUrl = `${cdnUrl}/${path}`;
      const url = this.prepareCdnUrl(baseUrl, query);

      // Generate signed URL
      let signedUrl: string;
      try {
        signedUrl = getSignedUrl({
          url,
          privateKey: privateKey.replace(/\\n/g, "\n").trim(),
          keyPairId,
          dateLessThan: new Date(Date.now() + dateLessThan * 1000),
        });
      } catch (err) {
        this.logger.error({ err, path }, "Failed to generate signed URL");
        throw new CloudFrontCdnException("Error generating signed URL");
      }

      // Fetch from CloudFront
      try {
        const response = await axios.get(signedUrl, {
          responseType: "arraybuffer",
          headers: {
            "Accept-Encoding": "gzip, br",
          },
          timeout: 5000,
        });

        const data = Buffer.from(response.data).toString("utf-8");

        return data;
      } catch (err) {
        const axiosErr = err as AxiosError;
        this.logger.error({ err: axiosErr, path }, "CloudFront fetch failed");
        throw new CloudFrontCdnException(axiosErr.message);
      }
    } catch (error) {
      this.logger.error(`An error occurred in readCloudFrontAsync for path ${path}: ${error}`);
      throw error;
    }
  }

  private prepareCdnUrl(baseUrl: string, query: ICloudFrontQueryParams[] = []): string {
    try {
      if (query.length > 0) {
        const queryString = query.map((param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`).join("&");
        return `${baseUrl}?${queryString}`;
      } else {
        return baseUrl;
      }
    } catch (error) {
      this.logger.error(`An error occurred while preparing the CDN URL: ${error}`);
      throw new CloudFrontCdnException("An error occurred while preparing the CDN URL");
    }
  }
}
