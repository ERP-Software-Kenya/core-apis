import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CqrsMediator } from '../../../common';
import { CreateInvoiceCommand } from './commands';
import { Invoice } from './domain';
import { CreateInvoiceRequest, InvoiceResponse } from './models';
import { GetInvoiceQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Invoices')
@Controller({ path: 'invoices', version: '1' })
export class InvoicesController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(InvoicesController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Get invoice by ID' })
  @ApiOkResponse({ type: InvoiceResponse })
  @ApiParam({ name: 'id', description: 'Invoice UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<InvoiceResponse> {
    const query = new GetInvoiceQuery();
    query.id = id;
    const result = await this.mediator.execute<GetInvoiceQuery, Invoice>(query);
    return this.mapper.map(result, Invoice, InvoiceResponse);
  }

  @ApiOperation({ summary: 'Create a new invoice' })
  @ApiCreatedResponse({ type: InvoiceResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateInvoiceRequest): Promise<InvoiceResponse> {
    const command = this.mapper.map(body, CreateInvoiceRequest, CreateInvoiceCommand);
    const result  = await this.mediator.execute<CreateInvoiceCommand, Invoice>(command);
    return this.mapper.map(result, Invoice, InvoiceResponse);
  }
}
