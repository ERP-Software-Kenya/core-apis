import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { BaseSeed } from '../../../common';
import { MaintenanceTypeEntity } from '../entities';

@Injectable()
export class MaintenanceTypesSeed extends BaseSeed<MaintenanceTypeEntity> {
  public get version(): number {
    return 1;
  }

  public get seedingData(): Partial<MaintenanceTypeEntity>[] {
    return [
      { name: 'Oil Change' },
      { name: 'Tire Rotation' },
      { name: 'Tire Replacement' },
      { name: 'Brake Service' },
      { name: 'Brake Pad Replacement' },
      { name: 'Engine Tune-up' },
      { name: 'Transmission Service' },
      { name: 'Battery Replacement' },
      { name: 'Air Filter Replacement' },
      { name: 'Fuel Filter Replacement' },
      { name: 'Coolant Flush' },
      { name: 'Wheel Alignment' },
      { name: 'Wheel Balancing' },
      { name: 'Clutch Replacement' },
      { name: 'Suspension Service' },
      { name: 'Electrical System Check' },
      { name: 'AC Service' },
      { name: 'General Inspection' },
    ];
  }

  public constructor(
    dataSource: DataSource,
    @InjectRepository(MaintenanceTypeEntity) repo: Repository<MaintenanceTypeEntity>,
    @InjectPinoLogger(MaintenanceTypesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<MaintenanceTypeEntity>, y: Partial<MaintenanceTypeEntity>): boolean {
    return x.name === y.name;
  }

  protected createFilter(): FindOptionsWhere<MaintenanceTypeEntity> {
    return {};
  }
}
