import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser, IPageable, LocationAccessDeniedException, Roles, RolesGuard, assertOrgOwnership } from '../../../common';
import { ERole } from '../../../infrastructure';
import { Location } from '../locations/domain';
import { ListLocationsQuery } from '../locations/queries';
import { CreateBranchCommand, UpdateBranchCommand } from './commands';
import { Branch } from './domain';
import {
  BranchResponse,
  BranchesPagedResponse,
  CreateBranchRequest,
  ListBranchesRequest,
  SearchBranchesRequest,
  UpdateBranchRequest,
} from './models';
import { GetBranchQuery, ListBranchesQuery, SearchBranchesQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Branches')
@Controller({ path: 'branches', version: '1' })
@UseGuards(ClerkAuthGuard, RolesGuard)
export class BranchesController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(BranchesController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search branches (paginated)' })
  @ApiOkResponse({ type: BranchesPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.OrgManager, ERole.SuperAdmin)
  @Get()
  public async search(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filter?: SearchBranchesRequest,
  ): Promise<BranchesPagedResponse> {
    if (!user.organizationId) return { items: [], page: 1, perPage: 15, totalCount: 0, totalPages: 0 };
    const query = this.mapper.map(filter ?? new SearchBranchesRequest(), SearchBranchesRequest, SearchBranchesQuery);
    query.organizationId = user.organizationId;
    const result = await this.mediator.execute<SearchBranchesQuery, IPageable<Branch>>(query);
    return { ...result, items: this.mapper.mapArray(result.items, Branch, BranchResponse) };
  }

  @ApiOperation({ summary: 'List all branches for the current organization' })
  @ApiOkResponse({ type: [BranchResponse] })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.OrgManager, ERole.SuperAdmin, ERole.StoreManager, ERole.BranchManager)
  @Get('list')
  public async list(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filter?: ListBranchesRequest,
  ): Promise<BranchResponse[]> {
    if (!user.organizationId) return [];
    const query = this.mapper.map(filter ?? new ListBranchesRequest(), ListBranchesRequest, ListBranchesQuery);
    query.organizationId = user.organizationId;
    const hasVisibleBranches = await this.applyBranchScope(user, query);
    if (!hasVisibleBranches) return [];
    const result = await this.mediator.execute<ListBranchesQuery, Branch[]>(query);
    return this.mapper.mapArray(result, Branch, BranchResponse);
  }

  @ApiOperation({ summary: 'Get branch by ID' })
  @ApiOkResponse({ type: BranchResponse })
  @ApiParam({ name: 'id', description: 'Branch UUID' })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.OrgManager, ERole.SuperAdmin)
  @Get(':id')
  public async getById(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<BranchResponse> {
    const query = new GetBranchQuery();
    query.id = id;
    const result = await this.mediator.execute<GetBranchQuery, Branch>(query);
    assertOrgOwnership(user, result.organizationId, 'Branch');
    return this.mapper.map(result, Branch, BranchResponse);
  }

  @ApiOperation({ summary: 'Create a new branch' })
  @ApiCreatedResponse({ type: BranchResponse })
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.OrgAdmin, ERole.OrgManager, ERole.SuperAdmin)
  @Post()
  public async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: CreateBranchRequest,
  ): Promise<BranchResponse> {
    const command = this.mapper.map(body, CreateBranchRequest, CreateBranchCommand);
    command.organizationId = user.organizationId;
    const result = await this.mediator.execute<CreateBranchCommand, Branch>(command);
    return this.mapper.map(result, Branch, BranchResponse);
  }

  @ApiOperation({ summary: 'Update a branch' })
  @ApiOkResponse({ type: BranchResponse })
  @ApiParam({ name: 'id', description: 'Branch UUID' })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.OrgManager, ERole.SuperAdmin)
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: UpdateBranchRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<BranchResponse> {
    const fetchQuery = new GetBranchQuery();
    fetchQuery.id = id;
    const existing = await this.mediator.execute<GetBranchQuery, Branch>(fetchQuery);
    assertOrgOwnership(user, existing.organizationId, 'Branch');
    const command = this.mapper.map(body, UpdateBranchRequest, UpdateBranchCommand);
    command.id = id;
    command.organizationId = user.organizationId;
    const result = await this.mediator.execute<UpdateBranchCommand, Branch>(command);
    return this.mapper.map(result, Branch, BranchResponse);
  }

  @ApiOperation({ summary: 'Set branch inactive' })
  @ApiOkResponse({ type: BranchResponse })
  @ApiParam({ name: 'id', description: 'Branch UUID' })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.OrgManager, ERole.SuperAdmin)
  @Patch(':id/inactive')
  public async inactive(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<BranchResponse> {
    const fetchQuery = new GetBranchQuery();
    fetchQuery.id = id;
    const existing = await this.mediator.execute<GetBranchQuery, Branch>(fetchQuery);
    assertOrgOwnership(user, existing.organizationId, 'Branch');
    const command = new UpdateBranchCommand();
    command.id = id;
    command.organizationId = user.organizationId;
    command.isActive = false;
    const result = await this.mediator.execute<UpdateBranchCommand, Branch>(command);
    return this.mapper.map(result, Branch, BranchResponse);
  }

  private async applyBranchScope(user: AuthenticatedUser, query: ListBranchesQuery): Promise<boolean> {
    if (user.hasOrgWideAccess) return true;

    if (user.branchIds.length) {
      query.$ids = user.branchIds;
      return true;
    }

    if (!user.locationIds.length) {
      throw new LocationAccessDeniedException(undefined, 'No branch or store location assigned to your account.');
    }

    const locationQuery = new ListLocationsQuery();
    locationQuery.organizationId = user.organizationId;
    locationQuery.$ids = user.locationIds;
    const locations = await this.mediator.execute<ListLocationsQuery, Location[]>(locationQuery);
    const branchIds = [...new Set(locations.map((location) => location.branchId).filter(Boolean))];
    if (!branchIds.length) return false;
    query.$ids = branchIds;
    return true;
  }
}
