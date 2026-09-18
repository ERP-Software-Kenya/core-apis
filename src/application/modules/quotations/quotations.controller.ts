import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  ClerkAuthGuard,
  CqrsMediator,
  CurrentUser,
  AuthenticatedUser,
  Roles,
  RolesGuard,
  IPageable,
  requireOrganizationId,
  assertOrgOwnership,
  PdfDocument,
} from '../../../common';
import { ERole } from '../../../infrastructure';
import {
  CreateQuotationCommand,
  UpdateQuotationCommand,
  ReviseQuotationCommand,
  ConvertToOrderCommand,
  SendQuotationEmailCommand,
} from './commands';
import {
  GetQuotationQuery,
  SearchQuotationsQuery,
  GetQuotationRevisionsQuery,
  ExportQuotationQuery,
} from './queries';
import { Quotation } from './domain';
import { Order } from '../orders/domain';
import {
  CreateQuotationDto,
  UpdateQuotationDto,
  ConvertToOrderDto,
  SendQuotationEmailDto,
  QuotationFilterDto,
  QuotationResponse,
} from './models';

class QuotationsPagedResponse {
  public items: QuotationResponse[];
  public page: number;
  public perPage: number;
  public totalCount: number;
  public totalPages: number;
}

@ApiBearerAuth()
@ApiTags('Quotations')
@UseGuards(ClerkAuthGuard, RolesGuard)
@Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.BranchManager)
@Controller({ path: 'quotations', version: '1' })
export class QuotationsController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectPinoLogger(QuotationsController.name)
    protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search quotations (paginated)' })
  @ApiOkResponse({ type: QuotationsPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filter?: QuotationFilterDto,
  ): Promise<QuotationsPagedResponse> {
    const query = new SearchQuotationsQuery();
    query.organizationId = requireOrganizationId(user);
    query.locationId = filter?.locationId;
    query.customerId = filter?.customerId;
    query.status = filter?.status;
    query.isLatest = filter?.isLatest;
    query.search = filter?.search?.trim() || undefined;
    query.$page = filter?.$page ?? 1;
    query.$perPage = filter?.$perPage ?? 20;

    const result = await this.mediator.execute<
      SearchQuotationsQuery,
      IPageable<Quotation>
    >(query);

    return {
      items: result.items as unknown as QuotationResponse[],
      page: result.page,
      perPage: result.perPage,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
    };
  }

  @ApiOperation({ summary: 'Get quotation by ID' })
  @ApiOkResponse({ type: QuotationResponse })
  @ApiParam({ name: 'id', description: 'Quotation UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<QuotationResponse> {
    const query = new GetQuotationQuery();
    query.id = id;
    const result = await this.mediator.execute<GetQuotationQuery, Quotation>(query);
    assertOrgOwnership(user, result.organizationId, 'Quotation');
    return result;
  }

  @ApiOperation({ summary: 'Export quotation as PDF' })
  @ApiParam({ name: 'id', description: 'Quotation UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id/pdf')
  public async exportPdf(
    @Param('id') id: string,
    @Res() res: Response,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<void> {
    const ownershipQuery = new GetQuotationQuery();
    ownershipQuery.id = id;
    const quotation = await this.mediator.execute<GetQuotationQuery, Quotation>(ownershipQuery);
    assertOrgOwnership(user, quotation.organizationId, 'Quotation');
    const query = new ExportQuotationQuery();
    query.id = id;
    const doc: PdfDocument = await this.mediator.execute<ExportQuotationQuery, PdfDocument>(query);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${doc.filename}"`,
      'Content-Length': String(doc.buffer.byteLength),
    });
    res.end(doc.buffer);
  }

  @ApiOperation({ summary: 'Get all revisions for a quotation' })
  @ApiOkResponse({ type: [QuotationResponse] })
  @ApiParam({ name: 'id', description: 'Quotation UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id/revisions')
  public async getRevisions(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<QuotationResponse[]> {
    const ownershipQuery = new GetQuotationQuery();
    ownershipQuery.id = id;
    const quotation = await this.mediator.execute<GetQuotationQuery, Quotation>(ownershipQuery);
    assertOrgOwnership(user, quotation.organizationId, 'Quotation');
    const query = new GetQuotationRevisionsQuery();
    query.id = id;
    const result = await this.mediator.execute<GetQuotationRevisionsQuery, Quotation[]>(query);
    return result;
  }

  @ApiOperation({ summary: 'Create a new quotation' })
  @ApiCreatedResponse({ type: QuotationResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateQuotationDto,
  ): Promise<QuotationResponse> {
    const command = new CreateQuotationCommand();
    command.organizationId = requireOrganizationId(user);
    command.locationId = dto.locationId;
    command.customerId = dto.customerId;
    command.notes = dto.notes;
    command.items = dto.items;
    command.createdByUserId = user.dbUserId;

    const result = await this.mediator.execute<CreateQuotationCommand, Quotation>(command);
    return result;
  }

  @ApiOperation({ summary: 'Update a draft quotation' })
  @ApiOkResponse({ type: QuotationResponse })
  @ApiParam({ name: 'id', description: 'Quotation UUID' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateQuotationDto,
  ): Promise<QuotationResponse> {
    const ownershipQuery = new GetQuotationQuery();
    ownershipQuery.id = id;
    const existing = await this.mediator.execute<GetQuotationQuery, Quotation>(ownershipQuery);
    assertOrgOwnership(user, existing.organizationId, 'Quotation');
    const command = new UpdateQuotationCommand();
    command.id = id;
    command.locationId = dto.locationId;
    command.customerId = dto.customerId;
    command.notes = dto.notes;
    command.items = dto.items;

    const result = await this.mediator.execute<UpdateQuotationCommand, Quotation>(command);
    return result;
  }

  @ApiOperation({ summary: 'Create a new revision from an existing quotation' })
  @ApiCreatedResponse({ type: QuotationResponse })
  @ApiParam({ name: 'id', description: 'Quotation UUID' })
  @HttpCode(HttpStatus.CREATED)
  @Post(':id/revise')
  public async revise(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<QuotationResponse> {
    const ownershipQuery = new GetQuotationQuery();
    ownershipQuery.id = id;
    const existing = await this.mediator.execute<GetQuotationQuery, Quotation>(ownershipQuery);
    assertOrgOwnership(user, existing.organizationId, 'Quotation');
    const command = new ReviseQuotationCommand();
    command.id = id;
    command.createdByUserId = user.dbUserId;

    const result = await this.mediator.execute<ReviseQuotationCommand, Quotation>(command);
    return result;
  }

  @ApiOperation({ summary: 'Convert quotation to Sales Order' })
  @ApiCreatedResponse({ description: 'Created Sales Order' })
  @ApiParam({ name: 'id', description: 'Quotation UUID' })
  @HttpCode(HttpStatus.CREATED)
  @Post(':id/convert-to-order')
  public async convertToOrder(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto?: ConvertToOrderDto,
  ): Promise<Order> {
    const ownershipQuery = new GetQuotationQuery();
    ownershipQuery.id = id;
    const existing = await this.mediator.execute<GetQuotationQuery, Quotation>(ownershipQuery);
    assertOrgOwnership(user, existing.organizationId, 'Quotation');
    const command = new ConvertToOrderCommand();
    command.id = id;
    command.fulfillmentMode = dto?.fulfillmentMode;
    command.fulfillmentLocationId = dto?.fulfillmentLocationId;
    command.performedById = user.dbUserId;

    return this.mediator.execute<ConvertToOrderCommand, Order>(command);
  }

  @ApiOperation({ summary: 'Send quotation PDF via email' })
  @ApiOkResponse({ type: QuotationResponse })
  @ApiParam({ name: 'id', description: 'Quotation UUID' })
  @HttpCode(HttpStatus.OK)
  @Post(':id/send-email')
  public async sendEmail(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: SendQuotationEmailDto,
  ): Promise<QuotationResponse> {
    const ownershipQuery = new GetQuotationQuery();
    ownershipQuery.id = id;
    const existing = await this.mediator.execute<GetQuotationQuery, Quotation>(ownershipQuery);
    assertOrgOwnership(user, existing.organizationId, 'Quotation');
    const command = new SendQuotationEmailCommand();
    command.id = id;
    command.recipientEmail = dto.recipientEmail;
    command.subject = dto.subject;
    command.body = dto.body;
    command.pdfBase64 = dto.pdfBase64;

    const result = await this.mediator.execute<SendQuotationEmailCommand, Quotation>(command);
    return result;
  }
}
