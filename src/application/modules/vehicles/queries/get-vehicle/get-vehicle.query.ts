import { IQuery } from '@nestjs/cqrs';

export class GetVehicleQuery implements IQuery {
  public id: string;
}
