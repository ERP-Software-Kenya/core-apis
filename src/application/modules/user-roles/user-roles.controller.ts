import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CqrsMediator } from '../../../common';
import { CreateUserRoleCommand } from './commands';
import { UserRole } from './domain';
import { CreateUserRoleRequest, UserRoleResponse } from './models';
import { GetUserRoleQuery } from './queries';

@ApiBearerAuth()
@ApiTags('UserRoles')
@Controller({ path: 'user-roles', version: '1' })
export class UserRolesController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(UserRolesController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Get user role by ID' })
  @ApiOkResponse({ type: UserRoleResponse })
  @ApiParam({ name: 'id', description: 'UserRole UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<UserRoleResponse> {
    const query = new GetUserRoleQuery();
    query.id = id;
    const result = await this.mediator.execute<GetUserRoleQuery, UserRole>(query);
    return this.mapper.map(result, UserRole, UserRoleResponse);
  }

  @ApiOperation({ summary: 'Create a new user role association' })
  @ApiCreatedResponse({ type: UserRoleResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateUserRoleRequest): Promise<UserRoleResponse> {
    const command = this.mapper.map(body, CreateUserRoleRequest, CreateUserRoleCommand);
    const result  = await this.mediator.execute<CreateUserRoleCommand, UserRole>(command);
    return this.mapper.map(result, UserRole, UserRoleResponse);
  }
}
