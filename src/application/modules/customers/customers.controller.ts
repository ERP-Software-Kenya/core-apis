import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser, IPageable, RolesGuard, Roles } from '../../../common';
import { CreateCustomerCommand, DeleteCustomerCommand, UpdateCustomerCommand } from './commands';
import { Customer } from './domain';
import { CreateCustomerRequest, CustomerResponse, SearchCustomersRequest, UpdateCustomerRequest } from './models';
import { GetCustomerQuery, SearchCustomersQuery } from './queries';
import { ERole } from '../../../infrastructure';

const FALLBACK_ORG_ID = '00000000-0000-4000-8000-000000000001';

class CustomersPagedResponse {
  public items: CustomerResponse[];
  public page: number;
  public perPage: number;
  public totalCount: number;
  public totalPages: number;
}

@ApiBearerAuth()
@ApiTags('Customers')
@UseGuards(ClerkAuthGuard)
@Controller({ path: 'customers', version: '1' })
export class CustomersController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(CustomersController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search customers (paginated)' })
  @ApiOkResponse({ type: CustomersPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(@Query() filter?: SearchCustomersRequest): Promise<CustomersPagedResponse> {
    const query  = this.mapper.map(filter, SearchCustomersRequest, SearchCustomersQuery);
    const result = await this.mediator.execute<SearchCustomersQuery, IPageable<Customer>>(query);
    return { ...result, items: this.mapper.mapArray(result.items, Customer, CustomerResponse) };
  }

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
  public async create(
    @Body() body: CreateCustomerRequest,
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<CustomerResponse> {
    const command = this.mapper.map(body, CreateCustomerRequest, CreateCustomerCommand);
    command.organizationId = user?.organizationId ?? FALLBACK_ORG_ID;
    const result  = await this.mediator.execute<CreateCustomerCommand, Customer>(command);
    return this.mapper.map(result, Customer, CustomerResponse);
  }

  @ApiOperation({ summary: 'Update a customer' })
  @ApiOkResponse({ type: CustomerResponse })
  @ApiParam({ name: 'id', description: 'Customer UUID' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateCustomerRequest): Promise<CustomerResponse> {
    const command = this.mapper.map(body, UpdateCustomerRequest, UpdateCustomerCommand);
    command.id    = id;
    const result  = await this.mediator.execute<UpdateCustomerCommand, Customer>(command);
    return this.mapper.map(result, Customer, CustomerResponse);
  }

  @ApiOperation({ summary: 'Delete a customer (soft delete)' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Customer UUID' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ERole.StoreManager, ERole.OrgManager, ERole.OrgAdmin, ERole.SuperAdmin)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const command = new DeleteCustomerCommand();
    command.id    = id;
    return this.mediator.execute<DeleteCustomerCommand, boolean>(command);
  }
}
