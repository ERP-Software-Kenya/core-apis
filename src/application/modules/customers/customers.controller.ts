import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CqrsMediator } from '../../../common';
import { CreateCustomerCommand } from './commands';
import { Customer } from './domain';
import { CreateCustomerRequest, CustomerResponse } from './models';
import { GetCustomerQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Customers')
@Controller({ path: 'customers', version: '1' })
export class CustomersController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(CustomersController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Get customer by ID' })
  @ApiOkResponse({ type: CustomerResponse })
  @ApiParam({ name: 'id', description: 'Customer UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<CustomerResponse> {
    const query = new GetCustomerQuery();
    query.id = id;
    const result = await this.mediator.execute<GetCustomerQuery, Customer>(query);
    return this.mapper.map(result, Customer, CustomerResponse);
  }

  @ApiOperation({ summary: 'Create a new customer' })
  @ApiCreatedResponse({ type: CustomerResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateCustomerRequest): Promise<CustomerResponse> {
    const command = this.mapper.map(body, CreateCustomerRequest, CreateCustomerCommand);
    const result  = await this.mediator.execute<CreateCustomerCommand, Customer>(command);
    return this.mapper.map(result, Customer, CustomerResponse);
  }
}
