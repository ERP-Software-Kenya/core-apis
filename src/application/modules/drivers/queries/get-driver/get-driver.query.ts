import { IQuery } from '@nestjs/cqrs';

export class GetDriverQuery implements IQuery {
  public id: string;
}
