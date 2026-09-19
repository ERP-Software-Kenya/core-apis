import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { FindOptionsWhere, Repository, DataSource } from "typeorm";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { BaseSeed } from "../../../common";
import { CountryEntity } from "../entities";

@Injectable()
export class RefCountriesSeed extends BaseSeed<CountryEntity> {
  public get version(): number { return 1; }
  public get seedingData(): Partial<CountryEntity>[] { return []; }

  constructor(
    dataSource: DataSource,
    @InjectRepository(CountryEntity) repo: Repository<CountryEntity>,
    @InjectPinoLogger(RefCountriesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  public override async transformSeedDataAsync(): Promise<Partial<CountryEntity>[]> {
    return this.fetchFromB2('seeds/countries.json');
  }

  protected equalityCheck(x: Partial<CountryEntity>, y: Partial<CountryEntity>): boolean {
    return x.id === y.id;
  }

  protected createFilter(): FindOptionsWhere<CountryEntity> { return {}; }

  private static readonly FALLBACK_COUNTRIES: Partial<CountryEntity>[] = [
    { id: 1, name: 'Kenya', iso2: 'KE', iso3: 'KEN', phoneCode: '254', currency: 'KES' },
    { id: 2, name: 'India', iso2: 'IN', iso3: 'IND', phoneCode: '91', currency: 'INR' },
    { id: 3, name: 'United States', iso2: 'US', iso3: 'USA', phoneCode: '1', currency: 'USD' },
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
      this.logger.warn(`Could not fetch ${key} from storage (${(err as Error).message}) — using local fallback countries`);
      return RefCountriesSeed.FALLBACK_COUNTRIES;
    }
  }
}
