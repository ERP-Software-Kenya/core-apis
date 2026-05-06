import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { USER_REPO } from '../../../../constants';
import { User } from '../../domain';
import { IUserRepo } from '../..';
import { GetUserQuery } from './get-user.query';

@QueryHandlerStrict(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery, User> {
  constructor(
    @Inject(USER_REPO) private readonly repo: IUserRepo,
    @InjectPinoLogger(GetUserQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetUserQuery): Promise<User> {
    this.logger.info(`Executing ${GetUserQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
