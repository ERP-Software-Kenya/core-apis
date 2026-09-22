import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  AuthenticatedUser,
  ClerkAuthGuard,
  CqrsMediator,
  CurrentUser,
  IPageable,
  Roles,
  RolesGuard,
  assertBranchAccess,
} from '../../../common';
import { ERole } from '../../../infrastructure';
import { CopyMainBranchPricesCommand, UpsertBranchProductPriceCommand } from './commands';
import { ProductBranchPrice } from './domain';
import {
  ListBranchProductPricesRequest,
  ProductBranchPriceResponse,
  ProductBranchPricesPagedResponse,
  UpsertBranchProductPriceRequest,
} from './models';
import { ListBranchProductPricesQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Product Branch Prices')
@Controller({ path: 'product-branch-prices', version: '1' })
@UseGuards(ClerkAuthGuard, RolesGuard)
export class ProductBranchPricesController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(ProductBranchPricesController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'List products with branch-specific prices' })
  @ApiOkResponse({ type: ProductBranchPricesPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.BranchManager)
  @Get()
  public async list(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filter: ListBranchProductPricesRequest,
  ): Promise<ProductBranchPricesPagedResponse> {
    const resolvedBranchId = user.hasOrgWideAccess ? filter.branchId : user.branchId;
    if (!resolvedBranchId) {
      throw new BadRequestException('branchId is required.');
    }

    const query = new ListBranchProductPricesQuery();
    query.branchId = resolvedBranchId;
    query.organizationId = user.organizationId;
    query.page = filter.page ?? 1;
    query.perPage = filter.perPage ?? 20;
    query.search = filter.search;

    const result = await this.mediator.execute<ListBranchProductPricesQuery, IPageable<ProductBranchPrice>>(query);
    return {
      ...result,
      items: this.mapper.mapArray(result.items, ProductBranchPrice, ProductBranchPriceResponse),
    };
  }

  @ApiOperation({ summary: 'Upsert branch-specific price for a product' })
  @ApiOkResponse({ type: ProductBranchPriceResponse })
  @ApiParam({ name: 'branchId', description: 'Branch UUID' })
  @ApiParam({ name: 'productId', description: 'Product UUID' })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.BranchManager)
  @Patch(':branchId/products/:productId')
  public async upsert(
    @Param('branchId') branchId: string,
    @Param('productId') productId: string,
    @Body() body: UpsertBranchProductPriceRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ProductBranchPriceResponse> {
    assertBranchAccess(user, branchId);

    const command = new UpsertBranchProductPriceCommand();
    command.branchId = branchId;
    command.productId = productId;
    command.organizationId = user.organizationId;
    command.costPrice = body.costPrice;
    command.retailPrice = body.retailPrice;
    command.loyaltyPrice = body.loyaltyPrice;
    command.wholesalePrice = body.wholesalePrice;
    command.transferPrice = body.transferPrice;

    const result = await this.mediator.execute<UpsertBranchProductPriceCommand, ProductBranchPrice>(command);
    return this.mapper.map(result, ProductBranchPrice, ProductBranchPriceResponse);
  }

  @ApiOperation({ summary: 'Copy all main branch prices to target branch' })
  @ApiOkResponse()
  @ApiParam({ name: 'branchId', description: 'Target branch UUID' })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  @Post(':branchId/copy-from-main')
  public async copyFromMain(
    @Param('branchId') branchId: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<void> {
    const command = new CopyMainBranchPricesCommand();
    command.targetBranchId = branchId;
    command.organizationId = user.organizationId;
    await this.mediator.execute<CopyMainBranchPricesCommand, void>(command);
  }
}
