import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { FindOptionsWhere, Repository, DataSource } from "typeorm";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { BaseSeed } from "../../../common";
import { CurrencyEntity } from "../entities";

@Injectable()
export class RefCurrenciesSeed extends BaseSeed<CurrencyEntity> {
  public get version(): number { return 1; }
  public get seedingData(): Partial<CurrencyEntity>[] { return []; }

  constructor(
    dataSource: DataSource,
    @InjectRepository(CurrencyEntity) repo: Repository<CurrencyEntity>,
    @InjectPinoLogger(RefCurrenciesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  public override async transformSeedDataAsync(): Promise<Partial<CurrencyEntity>[]> {
    return this.fetchFromB2('seeds/currencies.json');
  }

  protected equalityCheck(x: Partial<CurrencyEntity>, y: Partial<CurrencyEntity>): boolean {
    return x.code === y.code;
  }

  protected createFilter(): FindOptionsWhere<CurrencyEntity> { return {}; }

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
