import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser, IPageable, InventoryNotOwnedByOrgException, Roles, RolesGuard } from '../../../common';
import { ERole } from 'src/infrastructure/persistence/entities/role.entity';
import { GetPurchaseOrderQuery } from '../purchase-orders/queries';
import { PurchaseOrder } from '../purchase-orders/domain';
import { CancelPurchaseReturnCommand, CreatePurchaseReturnCommand, FinalizePurchaseReturnCommand, UpdatePurchaseReturnCommand } from './commands';
import { PurchaseReturn } from './domain';
import {
  CreatePurchaseReturnRequest,
  ListPurchaseReturnsRequest,
  PurchaseReturnResponse,
  PurchaseReturnsPagedResponse,
  SearchPurchaseReturnsRequest,
  UpdatePurchaseReturnRequest,
} from './models';
import { GetPurchaseReturnQuery, ListPurchaseReturnsQuery, SearchPurchaseReturnsQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Purchase Returns')
@UseGuards(ClerkAuthGuard, RolesGuard)
@Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.BranchManager)
@Controller({ path: 'purchase-returns', version: '1' })
export class PurchaseReturnsController {
  constructor(
    private readonly mediator: CqrsMediator,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @ApiOperation({ summary: 'Search purchase returns (paginated)' })
  @ApiOkResponse({ type: PurchaseReturnsPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(@CurrentUser() user: AuthenticatedUser, @Query() filter?: SearchPurchaseReturnsRequest): Promise<PurchaseReturnsPagedResponse> {
    const query = this.mapper.map(filter ?? new SearchPurchaseReturnsRequest(), SearchPurchaseReturnsRequest, SearchPurchaseReturnsQuery);
    query.organizationId = user.organizationId;
    const result = await this.mediator.execute<SearchPurchaseReturnsQuery, IPageable<PurchaseReturn>>(query);
    return { ...result, items: this.mapper.mapArray(result.items, PurchaseReturn, PurchaseReturnResponse) };
  }

  @ApiOperation({ summary: 'List purchase returns' })
  @ApiOkResponse({ type: [PurchaseReturnResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(@CurrentUser() user: AuthenticatedUser, @Query() filter?: ListPurchaseReturnsRequest): Promise<PurchaseReturnResponse[]> {
    const query = this.mapper.map(filter ?? new ListPurchaseReturnsRequest(), ListPurchaseReturnsRequest, ListPurchaseReturnsQuery);
    query.organizationId = user.organizationId;
    const result = await this.mediator.execute<ListPurchaseReturnsQuery, PurchaseReturn[]>(query);
    return this.mapper.mapArray(result, PurchaseReturn, PurchaseReturnResponse);
  }

  @ApiOperation({ summary: 'Get purchase return by ID' })
  @ApiOkResponse({ type: PurchaseReturnResponse })
  @ApiParam({ name: 'id', description: 'Purchase Return UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<PurchaseReturnResponse> {
    const ret = await this.getAuthorizedReturn(id, user);
    return this.mapper.map(ret, PurchaseReturn, PurchaseReturnResponse);
  }

  @ApiOperation({ summary: 'Create a purchase return draft' })
  @ApiCreatedResponse({ type: PurchaseReturnResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@CurrentUser() user: AuthenticatedUser, @Body() body: CreatePurchaseReturnRequest): Promise<PurchaseReturnResponse> {
    await this.getAuthorizedPurchaseOrder(body.purchaseOrderId, user);
    const command = this.mapper.map(body, CreatePurchaseReturnRequest, CreatePurchaseReturnCommand);
    command.organizationId = user.organizationId;
    command.createdById = user.dbUserId;
    command.items = body.items;
    const result = await this.mediator.execute<CreatePurchaseReturnCommand, PurchaseReturn>(command);
    return this.mapper.map(result, PurchaseReturn, PurchaseReturnResponse);
  }

  @ApiOperation({ summary: 'Update a purchase return draft' })
  @ApiOkResponse({ type: PurchaseReturnResponse })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser, @Body() body: UpdatePurchaseReturnRequest): Promise<PurchaseReturnResponse> {
    await this.getAuthorizedReturn(id, user);
    const command = this.mapper.map(body, UpdatePurchaseReturnRequest, UpdatePurchaseReturnCommand);
    command.id = id;
    command.items = body.items;
    const result = await this.mediator.execute<UpdatePurchaseReturnCommand, PurchaseReturn>(command);
    return this.mapper.map(result, PurchaseReturn, PurchaseReturnResponse);
  }

  @ApiOperation({ summary: 'Finalize a purchase return and post stock effects idempotently' })
  @ApiOkResponse({ type: PurchaseReturnResponse })
  @HttpCode(HttpStatus.OK)
  @Post(':id/finalize')
  public async finalize(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<PurchaseReturnResponse> {
    await this.getAuthorizedReturn(id, user);
    const command = new FinalizePurchaseReturnCommand();
    command.id = id;
    command.performedById = user.dbUserId;
    const result = await this.mediator.execute<FinalizePurchaseReturnCommand, PurchaseReturn>(command);
    return this.mapper.map(result, PurchaseReturn, PurchaseReturnResponse);
  }

  @ApiOperation({ summary: 'Cancel a purchase return draft' })
  @ApiOkResponse({ type: PurchaseReturnResponse })
  @HttpCode(HttpStatus.OK)
  @Post(':id/cancel')
  public async cancel(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<PurchaseReturnResponse> {
    await this.getAuthorizedReturn(id, user);
    const command = new CancelPurchaseReturnCommand();
    command.id = id;
    const result = await this.mediator.execute<CancelPurchaseReturnCommand, PurchaseReturn>(command);
    return this.mapper.map(result, PurchaseReturn, PurchaseReturnResponse);
  }

  private async getAuthorizedPurchaseOrder(id: string, user: AuthenticatedUser): Promise<PurchaseOrder> {
    const query = new GetPurchaseOrderQuery();
    query.id = id;
    const po = await this.mediator.execute<GetPurchaseOrderQuery, PurchaseOrder>(query);
    if (po.organizationId !== user.organizationId) throw new InventoryNotOwnedByOrgException();
    return po;
  }

  private async getAuthorizedReturn(id: string, user: AuthenticatedUser): Promise<PurchaseReturn> {
    const query = new GetPurchaseReturnQuery();
    query.id = id;
    const ret = await this.mediator.execute<GetPurchaseReturnQuery, PurchaseReturn>(query);
    if (ret.organizationId !== user.organizationId) throw new InventoryNotOwnedByOrgException();
    return ret;
  }
}
