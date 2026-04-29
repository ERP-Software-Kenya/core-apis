import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CqrsMediator } from '../../../common';
import { IPageable } from '../../../common';
import { CreateProductCommand, DeleteProductCommand, UpdateProductCommand } from './commands';
import { Product } from './domain';
import { CreateProductRequest, SearchProductsRequest, ListProductsRequest, ProductResponse, ProductsPagedResponse, UpdateProductRequest } from './models';
import { GetProductQuery, ListProductsQuery, SearchProductsQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Products')
@Controller({ path: 'products', version: '1' })
export class ProductsController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(ProductsController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search products (paginated)' })
  @ApiOkResponse({ type: ProductsPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(@Query() filter?: SearchProductsRequest): Promise<ProductsPagedResponse> {
    const query = this.mapper.map(filter, SearchProductsRequest, SearchProductsQuery);
    const result = await this.mediator.execute<SearchProductsQuery, IPageable<Product>>(query);
    return {
      ...result,
      items: this.mapper.mapArray(result.items, Product, ProductResponse),
    };
  }

  @ApiOperation({ summary: 'List all products' })
  @ApiOkResponse({ type: [ProductResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(@Query() filter?: ListProductsRequest): Promise<ProductResponse[]> {
    const query = this.mapper.map(filter, ListProductsRequest, ListProductsQuery);
    const result = await this.mediator.execute<ListProductsQuery, Product[]>(query);
    return this.mapper.mapArray(result, Product, ProductResponse);
  }

  @ApiOperation({ summary: 'Get product by ID' })
  @ApiOkResponse({ type: ProductResponse })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<ProductResponse> {
    const query = new GetProductQuery();
    query.id = id;
    const result = await this.mediator.execute<GetProductQuery, Product>(query);
    return this.mapper.map(result, Product, ProductResponse);
  }

  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({ type: ProductResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateProductRequest): Promise<ProductResponse> {
    const command = this.mapper.map(body, CreateProductRequest, CreateProductCommand);
    const result  = await this.mediator.execute<CreateProductCommand, Product>(command);
    return this.mapper.map(result, Product, ProductResponse);
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiOkResponse({ type: ProductResponse })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateProductRequest): Promise<ProductResponse> {
    const command = this.mapper.map(body, UpdateProductRequest, UpdateProductCommand);
    command.id    = id;
    const result  = await this.mediator.execute<UpdateProductCommand, Product>(command);
    return this.mapper.map(result, Product, ProductResponse);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const command = new DeleteProductCommand();
    command.id    = id;
    return this.mediator.execute<DeleteProductCommand, boolean>(command);
  }
}
