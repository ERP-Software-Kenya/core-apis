import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { BaseSeed } from '../../../common';
import { VehicleTypeEntity } from '../entities';

@Injectable()
export class VehicleTypesSeed extends BaseSeed<VehicleTypeEntity> {
  public get version(): number {
    return 1;
  }

  public get seedingData(): Partial<VehicleTypeEntity>[] {
    return [
      { name: 'Truck',    description: 'Heavy-duty freight truck' },
      { name: 'Van',      description: 'Light delivery van' },
      { name: 'Car',      description: 'Passenger car' },
      { name: 'Bus',      description: 'Passenger bus' },
      { name: 'Trailer',  description: 'Semi-trailer / articulated truck' },
      { name: 'Pickup',   description: 'Pickup / utility truck' },
      { name: 'Minibus',  description: 'Small passenger minibus' },
      { name: 'Tanker',   description: 'Liquid / gas tanker' },
      { name: 'Flatbed',  description: 'Flatbed / open deck truck' },
      { name: 'Forklift', description: 'Warehouse forklift' },
    ];
  }

  public constructor(
    dataSource: DataSource,
    @InjectRepository(VehicleTypeEntity) repo: Repository<VehicleTypeEntity>,
    @InjectPinoLogger(VehicleTypesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<VehicleTypeEntity>, y: Partial<VehicleTypeEntity>): boolean {
    return x.name === y.name;
  }

  protected createFilter(): FindOptionsWhere<VehicleTypeEntity> {
    return {};
  }
}
