import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CqrsMediator } from '../../../common';
import { CreateUserCommand } from './commands';
import { User } from './domain';
import { CreateUserRequest, UserResponse } from './models';
import { GetUserQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(UsersController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({ type: UserResponse })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<UserResponse> {
    const query = new GetUserQuery();
    query.id = id;
    const result = await this.mediator.execute<GetUserQuery, User>(query);
    return this.mapper.map(result, User, UserResponse);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ type: UserResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateUserRequest): Promise<UserResponse> {
    const command = this.mapper.map(body, CreateUserRequest, CreateUserCommand);
    const result  = await this.mediator.execute<CreateUserCommand, User>(command);
    return this.mapper.map(result, User, UserResponse);
  }
}
