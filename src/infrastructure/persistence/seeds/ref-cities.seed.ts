import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { FindOptionsWhere, Repository, DataSource } from "typeorm";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { BaseSeed } from "../../../common";
import { CityEntity } from "../entities";

@Injectable()
export class RefCitiesSeed extends BaseSeed<CityEntity> {
  public get version(): number { return 1; }
  public get seedingData(): Partial<CityEntity>[] { return []; }

  constructor(
    dataSource: DataSource,
    @InjectRepository(CityEntity) repo: Repository<CityEntity>,
    @InjectPinoLogger(RefCitiesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  public override async transformSeedDataAsync(): Promise<Partial<CityEntity>[]> {
    const raw = await this.fetchFromB2('seeds/cities.json');
    return raw.map((item: any) => ({
      id: item.id,
      name: item.name,
      stateId: item.state_id ?? item.stateId,
      stateCode: item.state_code ?? item.stateCode,
      countryId: item.country_id ?? item.countryId,
      countryCode: item.country_code ?? item.countryCode,
      latitude: item.latitude,
      longitude: item.longitude,
    }));
  }

  protected equalityCheck(x: Partial<CityEntity>, y: Partial<CityEntity>): boolean {
    return x.id === y.id;
  }

  protected createFilter(): FindOptionsWhere<CityEntity> { return {}; }

  public override async runAsync(): Promise<void> {
    await this.loadSeedEntityAsync();
    if (!this.shouldRun()) return;
    this.logger.info(`Seeding ${this.name}...`);
    try {
      const data = await this.transformSeedDataAsync();
      if (data.length === 0) return;

      const chunkSize = 1000;
      let totalInserted = 0;
      for (let index = 0; index < data.length; index += chunkSize) {
        const chunk = data.slice(index, index + chunkSize);
        await this.repo.createQueryBuilder()
          .insert()
          .into(CityEntity)
          .values(chunk)
          .orIgnore()
          .execute();
        totalInserted += chunk.length;
      }

      await this.updateSeedEntityAsync();
      this.logger.info(`Seeding ${this.name} finished. Total records: ${totalInserted}`);
      await this.postSeedAsync();
    } catch (ex) {
      this.logger.error(ex, `Seeding ${this.name} failed`);
      throw ex;
    }
  }

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
