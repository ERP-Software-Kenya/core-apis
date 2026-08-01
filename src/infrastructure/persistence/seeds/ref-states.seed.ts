import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { FindOptionsWhere, Repository, DataSource } from "typeorm";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { BaseSeed } from "../../../common";
import { StateEntity } from "../entities";

@Injectable()
export class RefStatesSeed extends BaseSeed<StateEntity> {
  public get version(): number { return 1; }
  public get seedingData(): Partial<StateEntity>[] { return []; }

  constructor(
    dataSource: DataSource,
    @InjectRepository(StateEntity) repo: Repository<StateEntity>,
    @InjectPinoLogger(RefStatesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  public override async transformSeedDataAsync(): Promise<Partial<StateEntity>[]> {
    const raw = await this.fetchFromB2('seeds/states.json');
    return raw.map((item: any) => ({
      id: item.id,
      name: item.name,
      countryId: item.country_id ?? item.countryId,
      countryCode: item.country_code ?? item.countryCode,
      fipsCode: item.fips_code ?? item.fipsCode,
      iso2: item.iso2,
      latitude: item.latitude,
      longitude: item.longitude,
    }));
  }

  protected equalityCheck(x: Partial<StateEntity>, y: Partial<StateEntity>): boolean {
    return x.id === y.id;
  }

  protected createFilter(): FindOptionsWhere<StateEntity> { return {}; }

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
