import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { ROLE_REPO } from '../../../../constants';
import { Role } from '../../domain';
import { IRoleRepo } from '../..';
import { RoleResponse } from '../../models';
import { ListRolesQuery } from './list-roles.query';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@QueryHandlerStrict(ListRolesQuery)
export class ListRolesQueryHandler implements IQueryHandler<ListRolesQuery, RoleResponse[]> {
  public constructor(
    @Inject(ROLE_REPO) private readonly repo: IRoleRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(ListRolesQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(_query: ListRolesQuery): Promise<RoleResponse[]> {
    this.logger.info(`Executing ${ListRolesQuery.name}`);
    const roles = await this.repo.allAsync();
    return this.mapper.mapArray(roles, Role, RoleResponse);
  }
}
