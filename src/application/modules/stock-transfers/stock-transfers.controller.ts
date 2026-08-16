import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ClerkAuthGuard, CqrsMediator, CurrentUser, AuthenticatedUser, Roles, RolesGuard, InventoryNotOwnedByOrgException, LocationAccessDeniedException, assertLocationAccess } from 'src/common';
import { ERole } from 'src/infrastructure/persistence/entities/role.entity';
import { CancelStockTransferCommand, CompleteStockTransferCommand, CreateStockTransferCommand } from './commands';
import { StockTransfer } from './domain';
import { CompleteStockTransferRequest, CreateStockTransferRequest, StockTransferResponse } from './models';
import { GetStockTransferQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Stock Transfers')
@Controller({ path: 'stock-transfers', version: '1' })
@UseGuards(ClerkAuthGuard, RolesGuard)
@Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.StoreManager, ERole.StoreStaff)
export class StockTransfersController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(StockTransfersController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Get stock transfer by ID' })
  @ApiOkResponse({ type: StockTransferResponse })
  @ApiParam({ name: 'id', description: 'StockTransfer UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<StockTransferResponse> {
    const query  = new GetStockTransferQuery();
    query.id     = id;
    const result = await this.mediator.execute<GetStockTransferQuery, StockTransfer>(query);
    if (result.organizationId !== user.organizationId) throw new InventoryNotOwnedByOrgException();
    // Read access to either endpoint's location is sufficient to see the transfer.
    const canSeeEitherEnd = user.hasOrgWideAccess || user.locationIds.includes(result.fromLocationId) || user.locationIds.includes(result.toLocationId);
    if (!canSeeEitherEnd) throw new LocationAccessDeniedException();
    return this.mapper.map(result, StockTransfer, StockTransferResponse);
  }

  @ApiOperation({ summary: 'Create a new stock transfer' })
  @ApiCreatedResponse({ type: StockTransferResponse })
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.StoreManager)
  @Post()
  public async create(@CurrentUser() user: AuthenticatedUser, @Body() body: CreateStockTransferRequest): Promise<StockTransferResponse> {
    // Both ends are moved by this action, so the requester needs access to both.
    assertLocationAccess(user, body.fromLocationId);
    assertLocationAccess(user, body.toLocationId);
    const command          = this.mapper.map(body, CreateStockTransferRequest, CreateStockTransferCommand);
    command.organizationId = user.organizationId;
    const result           = await this.mediator.execute<CreateStockTransferCommand, StockTransfer>(command);
    return this.mapper.map(result, StockTransfer, StockTransferResponse);
  }

  @ApiOperation({ summary: 'Complete a stock transfer — executes stock movements for each item' })
  @ApiOkResponse({ type: StockTransferResponse })
  @ApiParam({ name: 'id', description: 'StockTransfer UUID' })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.StoreManager)
  @Put(':id/complete')
  public async complete(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser, @Body() body: CompleteStockTransferRequest): Promise<StockTransferResponse> {
    const transfer = await this.mediator.execute<GetStockTransferQuery, StockTransfer>(Object.assign(new GetStockTransferQuery(), { id }));
    if (transfer.organizationId !== user.organizationId) throw new InventoryNotOwnedByOrgException();
    assertLocationAccess(user, transfer.fromLocationId);
    assertLocationAccess(user, transfer.toLocationId);
    const command          = this.mapper.map(body, CompleteStockTransferRequest, CompleteStockTransferCommand);
    command.transferId     = id;
    command.organizationId = user.organizationId;
    command.performedById  = user.dbUserId;
    const result           = await this.mediator.execute<CompleteStockTransferCommand, StockTransfer>(command);
    return this.mapper.map(result, StockTransfer, StockTransferResponse);
  }

  @ApiOperation({ summary: 'Cancel a pending stock transfer' })
  @ApiOkResponse({ type: StockTransferResponse })
  @ApiParam({ name: 'id', description: 'StockTransfer UUID' })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  @Put(':id/cancel')
  public async cancel(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<StockTransferResponse> {
    const transfer = await this.mediator.execute<GetStockTransferQuery, StockTransfer>(Object.assign(new GetStockTransferQuery(), { id }));
    if (transfer.organizationId !== user.organizationId) throw new InventoryNotOwnedByOrgException();
    assertLocationAccess(user, transfer.fromLocationId);
    const command         = new CancelStockTransferCommand();
    command.transferId    = id;
    command.performedById = user.dbUserId;
    const result          = await this.mediator.execute<CancelStockTransferCommand, StockTransfer>(command);
    return this.mapper.map(result, StockTransfer, StockTransferResponse);
  }
}
