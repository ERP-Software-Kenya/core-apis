import { IQuery } from '@nestjs/cqrs';

export class GetTripQuery implements IQuery {
  public id: string;
}
