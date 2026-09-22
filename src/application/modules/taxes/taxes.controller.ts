import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser, IPageable, Roles, RolesGuard, assertOrgOwnership } from '../../../common';
import { ERole } from '../../../infrastructure';
import { CreateTaxCommand, DeleteTaxCommand, UpdateTaxCommand } from './commands';
import { Tax } from './domain';
import { CreateTaxRequest, UpdateTaxRequest, SearchTaxesRequest, ListTaxesRequest, TaxResponse, TaxesPagedResponse } from './models';
import { GetTaxQuery, ListTaxesQuery, SearchTaxesQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Taxes')
@Controller({ path: 'taxes', version: '1' })
@UseGuards(ClerkAuthGuard, RolesGuard)
@Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.BranchManager)
export class TaxesController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(TaxesController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search taxes (paginated)' })
  @ApiOkResponse({ type: TaxesPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filter?: SearchTaxesRequest,
  ): Promise<TaxesPagedResponse> {
    const query = this.mapper.map(filter, SearchTaxesRequest, SearchTaxesQuery);
    query.organizationId = user.organizationId;
    const result = await this.mediator.execute<SearchTaxesQuery, IPageable<Tax>>(query);
    return {
      ...result,
      items: this.mapper.mapArray(result.items, Tax, TaxResponse),
    };
  }

  @ApiOperation({ summary: 'List all taxes' })
  @ApiOkResponse({ type: [TaxResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filter?: ListTaxesRequest,
  ): Promise<TaxResponse[]> {
    const query = this.mapper.map(filter, ListTaxesRequest, ListTaxesQuery);
    query.organizationId = user.organizationId;
    const result = await this.mediator.execute<ListTaxesQuery, Tax[]>(query);
    return this.mapper.mapArray(result, Tax, TaxResponse);
  }

  @ApiOperation({ summary: 'Get tax by ID' })
  @ApiOkResponse({ type: TaxResponse })
  @ApiParam({ name: 'id', description: 'Tax UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<TaxResponse> {
    const query = new GetTaxQuery();
    query.id = id;
    const result = await this.mediator.execute<GetTaxQuery, Tax>(query);
    assertOrgOwnership(user, result.organizationId, 'Tax');
    return this.mapper.map(result, Tax, TaxResponse);
  }

  @ApiOperation({ summary: 'Create a new tax' })
  @ApiCreatedResponse({ type: TaxResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: CreateTaxRequest,
  ): Promise<TaxResponse> {
    const command = this.mapper.map(body, CreateTaxRequest, CreateTaxCommand);
    command.organizationId = user.organizationId;
    const result = await this.mediator.execute<CreateTaxCommand, Tax>(command);
    return this.mapper.map(result, Tax, TaxResponse);
  }

  @ApiOperation({ summary: 'Update a tax' })
  @ApiOkResponse({ type: TaxResponse })
  @ApiParam({ name: 'id', description: 'Tax UUID' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: UpdateTaxRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<TaxResponse> {
    const fetchQuery = new GetTaxQuery();
    fetchQuery.id = id;
    const existing = await this.mediator.execute<GetTaxQuery, Tax>(fetchQuery);
    assertOrgOwnership(user, existing.organizationId, 'Tax');
    const command = this.mapper.map(body, UpdateTaxRequest, UpdateTaxCommand);
    command.id = id;
    const result = await this.mediator.execute<UpdateTaxCommand, Tax>(command);
    return this.mapper.map(result, Tax, TaxResponse);
  }

  @ApiOperation({ summary: 'Delete a tax' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Tax UUID' })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  @Delete(':id')
  public async delete(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<boolean> {
    const fetchQuery = new GetTaxQuery();
    fetchQuery.id = id;
    const existing = await this.mediator.execute<GetTaxQuery, Tax>(fetchQuery);
    assertOrgOwnership(user, existing.organizationId, 'Tax');
    const command = new DeleteTaxCommand();
    command.id = id;
    return this.mediator.execute<DeleteTaxCommand, boolean>(command);
  }
}
