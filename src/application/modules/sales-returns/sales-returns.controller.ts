import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  assertLocationAccess,
  assertOrgOwnership,
  AuthenticatedUser,
  ClerkAuthGuard,
  CqrsMediator,
  CurrentUser,
  IPageable,
  RolesGuard,
} from '../../../common';
import { GetBillQuery } from '../bills/queries';
import { Bill } from '../bills/domain';
import { CancelSalesReturnCommand, CreateSalesReturnCommand, FinalizeSalesReturnCommand, UpdateSalesReturnCommand } from './commands';
import { SalesReturn } from './domain';
import {
  CreateSalesReturnRequest,
  ListSalesReturnsRequest,
  SalesReturnResponse,
  SalesReturnsPagedResponse,
  SearchSalesReturnsRequest,
  UpdateSalesReturnRequest,
} from './models';
import { GetSalesReturnQuery, ListSalesReturnsQuery, SearchSalesReturnsQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Sales Returns')
@UseGuards(ClerkAuthGuard, RolesGuard)
@Controller({ path: 'sales-returns', version: '1' })
export class SalesReturnsController {
  constructor(
    private readonly mediator: CqrsMediator,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(SalesReturnsController.name) private readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search sales returns (paginated)' })
  @ApiOkResponse({ type: SalesReturnsPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(@CurrentUser() user: AuthenticatedUser, @Query() filter?: SearchSalesReturnsRequest): Promise<SalesReturnsPagedResponse> {
    const query = this.mapper.map(filter ?? new SearchSalesReturnsRequest(), SearchSalesReturnsRequest, SearchSalesReturnsQuery);
    query.organizationId = user.organizationId;
    this.applyLocationScope(user, query, filter?.locationId);
    const result = await this.mediator.execute<SearchSalesReturnsQuery, IPageable<SalesReturn>>(query);
    return { ...result, items: this.mapper.mapArray(result.items, SalesReturn, SalesReturnResponse) };
  }

  @ApiOperation({ summary: 'List sales returns' })
  @ApiOkResponse({ type: [SalesReturnResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(@CurrentUser() user: AuthenticatedUser, @Query() filter?: ListSalesReturnsRequest): Promise<SalesReturnResponse[]> {
    const query = this.mapper.map(filter ?? new ListSalesReturnsRequest(), ListSalesReturnsRequest, ListSalesReturnsQuery);
    query.organizationId = user.organizationId;
    this.applyLocationScope(user, query, filter?.locationId);
    const result = await this.mediator.execute<ListSalesReturnsQuery, SalesReturn[]>(query);
    return this.mapper.mapArray(result, SalesReturn, SalesReturnResponse);
  }

  @ApiOperation({ summary: 'Get sales return by ID' })
  @ApiOkResponse({ type: SalesReturnResponse })
  @ApiParam({ name: 'id', description: 'Sales Return UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<SalesReturnResponse> {
    const ret = await this.getAuthorizedReturn(id, user);
    return this.mapper.map(ret, SalesReturn, SalesReturnResponse);
  }

  @ApiOperation({ summary: 'Create a sales return draft' })
  @ApiCreatedResponse({ type: SalesReturnResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@CurrentUser() user: AuthenticatedUser, @Body() body: CreateSalesReturnRequest): Promise<SalesReturnResponse> {
    const bill = await this.getAuthorizedBill(body.billId, user);
    const command = this.mapper.map(body, CreateSalesReturnRequest, CreateSalesReturnCommand);
    command.organizationId = bill.organizationId;
    command.createdById = user.dbUserId;
    command.items = body.items;
    const result = await this.mediator.execute<CreateSalesReturnCommand, SalesReturn>(command);
    return this.mapper.map(result, SalesReturn, SalesReturnResponse);
  }

  @ApiOperation({ summary: 'Update a sales return draft' })
  @ApiOkResponse({ type: SalesReturnResponse })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser, @Body() body: UpdateSalesReturnRequest): Promise<SalesReturnResponse> {
    await this.getAuthorizedReturn(id, user);
    const command = this.mapper.map(body, UpdateSalesReturnRequest, UpdateSalesReturnCommand);
    command.id = id;
    command.items = body.items;
    const result = await this.mediator.execute<UpdateSalesReturnCommand, SalesReturn>(command);
    return this.mapper.map(result, SalesReturn, SalesReturnResponse);
  }

  @ApiOperation({ summary: 'Finalize a sales return and post stock/financial effects idempotently' })
  @ApiOkResponse({ type: SalesReturnResponse })
  @HttpCode(HttpStatus.OK)
  @Post(':id/finalize')
  public async finalize(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<SalesReturnResponse> {
    await this.getAuthorizedReturn(id, user);
    const command = new FinalizeSalesReturnCommand();
    command.id = id;
    command.performedById = user.dbUserId;
    const result = await this.mediator.execute<FinalizeSalesReturnCommand, SalesReturn>(command);
    return this.mapper.map(result, SalesReturn, SalesReturnResponse);
  }

  @ApiOperation({ summary: 'Cancel a sales return draft' })
  @ApiOkResponse({ type: SalesReturnResponse })
  @HttpCode(HttpStatus.OK)
  @Post(':id/cancel')
  public async cancel(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<SalesReturnResponse> {
    await this.getAuthorizedReturn(id, user);
    const command = new CancelSalesReturnCommand();
    command.id = id;
    const result = await this.mediator.execute<CancelSalesReturnCommand, SalesReturn>(command);
    return this.mapper.map(result, SalesReturn, SalesReturnResponse);
  }

  private async getAuthorizedBill(id: string, user: AuthenticatedUser): Promise<Bill> {
    const query = new GetBillQuery();
    query.id = id;
    const bill = await this.mediator.execute<GetBillQuery, Bill>(query);
    assertOrgOwnership(user, bill.organizationId, 'Bill');
    assertLocationAccess(user, bill.locationId);
    return bill;
  }

  private async getAuthorizedReturn(id: string, user: AuthenticatedUser): Promise<SalesReturn> {
    const query = new GetSalesReturnQuery();
    query.id = id;
    const ret = await this.mediator.execute<GetSalesReturnQuery, SalesReturn>(query);
    assertOrgOwnership(user, ret.organizationId, 'Sales return');
    assertLocationAccess(user, ret.locationId);
    return ret;
  }

  private applyLocationScope(
    user: AuthenticatedUser,
    query: { locationId?: string; accessibleLocationIds?: string[] },
    requestedLocationId?: string,
  ): void {
    if (requestedLocationId) {
      assertLocationAccess(user, requestedLocationId);
      query.locationId = requestedLocationId;
      return;
    }
    if (!user.hasOrgWideAccess) query.accessibleLocationIds = user.locationIds;
  }
}
