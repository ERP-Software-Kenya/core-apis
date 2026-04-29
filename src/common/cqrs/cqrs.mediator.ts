import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CommandBase } from './command-base';
import { CQBase } from './cq-base';
import { QueryBase } from '..';

@Injectable()
export class CqrsMediator {
  constructor(
    protected readonly queryBus: QueryBus,
    protected readonly commandBus: CommandBus,
  ) {}

  public async execute<T extends CQBase, TRes = any>(cq: T): Promise<TRes> {
    if (cq instanceof QueryBase) {
      return this.queryBus.execute<T, TRes>(cq);
    }
    if (cq instanceof CommandBase) {
      return this.commandBus.execute<T, TRes>(cq);
    }
    throw new Error(`Object is neither a QueryBase nor a CommandBase: ${cq?.constructor?.name}`);
  }
}
