import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { QUOTATION_REPO } from '../../../../constants';
import { IQuotationRepo } from '../../i-quotation.repo';
import { Quotation } from '../../domain';
import { CreateQuotationCommand } from './create-quotation.command';
import { calculateQuotationTotals } from '../../helpers';

@CommandHandlerStrict(CreateQuotationCommand)
export class CreateQuotationCommandHandler
  implements ICommandHandler<CreateQuotationCommand, Quotation>
{
  constructor(
    @Inject(QUOTATION_REPO) private readonly quotationRepo: IQuotationRepo,
    @InjectPinoLogger(CreateQuotationCommandHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateQuotationCommand): Promise<Quotation> {
    this.logger.info(`Executing ${CreateQuotationCommand.name}`);

    const totals = calculateQuotationTotals(command.items);
    return this.quotationRepo.createWithItemsAsync({
      organizationId: command.organizationId,
      locationId: command.locationId,
      customerId: command.customerId,
      notes: command.notes,
      createdByUserId: command.createdByUserId,
      totals,
    });
  }
}
