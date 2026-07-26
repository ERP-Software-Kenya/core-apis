import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CqrsMediator, IPageable } from '../../../common';
import { CreateProductCommand, DeleteProductCommand, UpdateProductCommand, UploadProductImageCommand } from './commands';
import { Product } from './domain';
import { CreateProductRequest, GetProductImageUploadUrlRequest, ListProductsRequest, ProductImageUploadUrlResponse, ProductResponse, ProductsPagedResponse, SearchProductsRequest, UpdateProductRequest } from './models';
import { GetProductQuery, GetProductImageUploadUrlQuery, ListProductsQuery, SearchProductsQuery } from './queries';

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

  @ApiOperation({ summary: 'Upload product image (server-side)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @ApiOkResponse({ type: ProductResponse })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/image')
  public async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProductResponse> {
    const command = new UploadProductImageCommand();
    command.productId = id;
    command.buffer    = file.buffer;
    command.mimeType  = file.mimetype;
    const result      = await this.mediator.execute<UploadProductImageCommand, Product>(command);
    return this.mapper.map(result, Product, ProductResponse);
  }

  @ApiOperation({ summary: 'Get presigned URL for direct client-side image upload to R2' })
  @ApiOkResponse({ type: ProductImageUploadUrlResponse })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id/image/presigned-url')
  public async getImagePresignedUrl(
    @Param('id') id: string,
    @Query() queryParams: GetProductImageUploadUrlRequest,
  ): Promise<ProductImageUploadUrlResponse> {
    const query = new GetProductImageUploadUrlQuery();
    query.productId = id;
    query.mimeType  = queryParams.mimeType;
    return this.mediator.execute<GetProductImageUploadUrlQuery, ProductImageUploadUrlResponse>(query);
  }
}
