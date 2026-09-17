import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { FindOptionsWhere, Repository, DataSource } from "typeorm";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { BaseSeed } from "../../../common";
import { LanguageEntity } from "../entities";

@Injectable()
export class RefLanguagesSeed extends BaseSeed<LanguageEntity> {
  public get version(): number { return 1; }
  public get seedingData(): Partial<LanguageEntity>[] { return []; }

  constructor(
    dataSource: DataSource,
    @InjectRepository(LanguageEntity) repo: Repository<LanguageEntity>,
    @InjectPinoLogger(RefLanguagesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  public override async transformSeedDataAsync(): Promise<Partial<LanguageEntity>[]> {
    return this.fetchFromB2('seeds/languages.json');
  }

  protected equalityCheck(x: Partial<LanguageEntity>, y: Partial<LanguageEntity>): boolean {
    return x.code === y.code;
  }

  protected createFilter(): FindOptionsWhere<LanguageEntity> { return {}; }

  private static readonly FALLBACK_LANGUAGES: Partial<LanguageEntity>[] = [
    { code: 'en', name: 'English' },
    { code: 'sw', name: 'Swahili' },
    { code: 'hi', name: 'Hindi' },
  ];

  private async fetchFromB2(key: string): Promise<any[]> {
    try {
      const rawEndpoint = process.env.STORAGE_ENDPOINT || '';
      const endpoint = rawEndpoint.startsWith('http') ? rawEndpoint : `https://${rawEndpoint}`;
      const client = new S3Client({
        region: process.env.STORAGE_REGION,
        endpoint,
        credentials: {
          accessKeyId: process.env.STORAGE_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY || '',
        },
      });
      const res = await client.send(new GetObjectCommand({ Bucket: process.env.STORAGE_BUCKET, Key: key }));
      const chunks: Buffer[] = [];
      for await (const chunk of res.Body as Readable) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      return JSON.parse(Buffer.concat(chunks).toString('utf-8'));
    } catch (err) {
      this.logger.warn(`Could not fetch ${key} from storage (${(err as Error).message}) — using local fallback languages`);
      return RefLanguagesSeed.FALLBACK_LANGUAGES;
    }
  }
}
