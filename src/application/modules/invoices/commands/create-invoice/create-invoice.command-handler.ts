import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { INVOICE_REPO } from '../../../../constants';
import { Invoice } from '../../domain';
import { IInvoiceRepo } from '../..';
import { CreateInvoiceCommand } from './create-invoice.command';

@CommandHandlerStrict(CreateInvoiceCommand)
export class CreateInvoiceCommandHandler implements ICommandHandler<CreateInvoiceCommand, Invoice> {
  constructor(
    @Inject(INVOICE_REPO) private readonly repo: IInvoiceRepo,
    @InjectPinoLogger(CreateInvoiceCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateInvoiceCommand): Promise<Invoice> {
    this.logger.info(`Executing ${CreateInvoiceCommand.name}`);
    const invoiceData = {
      ...command,
      invoiceNumber: `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };
    return this.repo.createAsync(invoiceData as any);
  }
}
