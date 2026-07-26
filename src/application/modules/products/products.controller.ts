import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ClerkAuthGuard, CqrsMediator, CurrentUser, IPageable, Roles, RolesGuard, AuthenticatedUser } from '../../../common';
import { ERole } from '../../../infrastructure';
import { AddProductImageCommand, CreateProductCommand, DeleteProductCommand, UpdateProductCommand } from './commands';
import { Product } from './domain';
import { CreateProductRequest, GetProductImageUploadUrlRequest, ListProductsRequest, ProductImageResponse, ProductImageUploadUrlResponse, ProductResponse, ProductsPagedResponse, SearchProductsRequest, UpdateProductRequest } from './models';
import { GetProductQuery, GetProductImageUploadUrlQuery, ListProductImagesQuery, ListProductsQuery, SearchProductsQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Products')
@Controller({ path: 'products', version: '1' })
@UseGuards(ClerkAuthGuard, RolesGuard)
@Roles(ERole.OrgAdmin, ERole.SuperAdmin)
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
  public async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: CreateProductRequest,
  ): Promise<ProductResponse> {
    const command = this.mapper.map(body, CreateProductRequest, CreateProductCommand);
    command.organizationId = user.organizationId;
    command.createdById    = user.dbUserId;
    const result = await this.mediator.execute<CreateProductCommand, Product>(command);
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

  @ApiOperation({ summary: 'Upload an image for a product (stored in B2; key saved to product_images)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @ApiCreatedResponse({ type: ProductImageResponse })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/images')
  public async addImage(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProductImageResponse> {
    const command = new AddProductImageCommand();
    command.productId    = id;
    command.buffer       = file.buffer;
    command.mimeType     = file.mimetype;
    command.uploadedById = user.dbUserId;
    return this.mediator.execute<AddProductImageCommand, ProductImageResponse>(command);
  }

  @ApiOperation({ summary: 'List images for a product' })
  @ApiOkResponse({ type: [ProductImageResponse] })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id/images')
  public async listImages(@Param('id') id: string): Promise<ProductImageResponse[]> {
    const query = new ListProductImagesQuery();
    query.productId = id;
    return this.mediator.execute<ListProductImagesQuery, ProductImageResponse[]>(query);
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
