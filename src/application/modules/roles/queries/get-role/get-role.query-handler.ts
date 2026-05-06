import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { ROLE_REPO } from '../../../../constants';
import { Role } from '../../domain';
import { IRoleRepo } from '../..';
import { GetRoleQuery } from './get-role.query';

@QueryHandlerStrict(GetRoleQuery)
export class GetRoleQueryHandler implements IQueryHandler<GetRoleQuery, Role> {
  constructor(
    @Inject(ROLE_REPO) private readonly repo: IRoleRepo,
    @InjectPinoLogger(GetRoleQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetRoleQuery): Promise<Role> {
    this.logger.info(`Executing ${GetRoleQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
