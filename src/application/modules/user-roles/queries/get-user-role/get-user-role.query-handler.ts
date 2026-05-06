import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { USER_ROLE_REPO } from '../../../../constants';
import { UserRole } from '../../domain';
import { IUserRoleRepo } from '../..';
import { GetUserRoleQuery } from './get-user-role.query';

@QueryHandlerStrict(GetUserRoleQuery)
export class GetUserRoleQueryHandler implements IQueryHandler<GetUserRoleQuery, UserRole> {
  constructor(
    @Inject(USER_ROLE_REPO) private readonly repo: IUserRoleRepo,
    @InjectPinoLogger(GetUserRoleQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetUserRoleQuery): Promise<UserRole> {
    this.logger.info(`Executing ${GetUserRoleQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
