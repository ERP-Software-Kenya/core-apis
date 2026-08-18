import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ClerkAuthGuard, CqrsMediator, RolesGuard, Roles } from '../../../common';
import { ERole } from '../../../infrastructure';
import { CreateUserRoleCommand, UpdateUserRoleCommand } from './commands';
import { UserRole } from './domain';
import { CreateUserRoleRequest, UpdateUserRoleRequest, UserRoleResponse } from './models';
import { GetUserRoleQuery, ListUserRolesQuery } from './queries';

@ApiBearerAuth()
@ApiTags('UserRoles')
@UseGuards(ClerkAuthGuard)
@Controller({ path: 'user-roles', version: '1' })
export class UserRolesController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(UserRolesController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'List all user-role assignments' })
  @ApiOkResponse({ type: [UserRoleResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(): Promise<UserRoleResponse[]> {
    const query = new ListUserRolesQuery();
    return this.mediator.execute<ListUserRolesQuery, UserRoleResponse[]>(query);
  }

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
  @UseGuards(RolesGuard)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  @Post()
  public async create(@Body() body: CreateUserRoleRequest): Promise<UserRoleResponse> {
    const command = this.mapper.map(body, CreateUserRoleRequest, CreateUserRoleCommand);
    const result  = await this.mediator.execute<CreateUserRoleCommand, UserRole>(command);
    return this.mapper.map(result, UserRole, UserRoleResponse);
  }

  @ApiOperation({ summary: 'Update a user role assignment (change role and/or store scope)' })
  @ApiOkResponse({ type: UserRoleResponse })
  @ApiParam({ name: 'id', description: 'UserRole UUID' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateUserRoleRequest): Promise<UserRoleResponse> {
    const command = this.mapper.map(body, UpdateUserRoleRequest, UpdateUserRoleCommand);
    command.id    = id;
    const result  = await this.mediator.execute<UpdateUserRoleCommand, UserRole>(command);
    return this.mapper.map(result, UserRole, UserRoleResponse);
  }
}
