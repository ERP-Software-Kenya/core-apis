import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { BaseSeed } from '../../../common';
import { VehicleBrandEntity } from '../entities';

@Injectable()
export class VehicleBrandsSeed extends BaseSeed<VehicleBrandEntity> {
  public get version(): number {
    return 1;
  }

  public get seedingData(): Partial<VehicleBrandEntity>[] {
    return [
      { brandName: 'Toyota' },
      { brandName: 'Ford' },
      { brandName: 'Mercedes-Benz' },
      { brandName: 'Volvo' },
      { brandName: 'Tata' },
      { brandName: 'Mahindra' },
      { brandName: 'Isuzu' },
      { brandName: 'Ashok Leyland' },
      { brandName: 'MAN' },
      { brandName: 'Scania' },
      { brandName: 'DAF' },
      { brandName: 'Renault' },
      { brandName: 'Mitsubishi' },
      { brandName: 'Hyundai' },
      { brandName: 'Eicher' },
    ];
  }

  public constructor(
    dataSource: DataSource,
    @InjectRepository(VehicleBrandEntity) repo: Repository<VehicleBrandEntity>,
    @InjectPinoLogger(VehicleBrandsSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<VehicleBrandEntity>, y: Partial<VehicleBrandEntity>): boolean {
    return x.brandName === y.brandName;
  }

  protected createFilter(): FindOptionsWhere<VehicleBrandEntity> {
    return {};
  }
}
