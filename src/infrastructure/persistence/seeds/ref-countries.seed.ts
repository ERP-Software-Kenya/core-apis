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

  private async fetchFromB2(key: string): Promise<any[]> {
    const client = new S3Client({
      region: process.env.STORAGE_REGION,
      endpoint: `https://${process.env.STORAGE_ENDPOINT}`,
      credentials: {
        accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
        secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY,
      },
    });
    const res = await client.send(new GetObjectCommand({ Bucket: process.env.STORAGE_BUCKET, Key: key }));
    const chunks: Buffer[] = [];
    for await (const chunk of res.Body as Readable) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    return JSON.parse(Buffer.concat(chunks).toString('utf-8'));
  }
}
