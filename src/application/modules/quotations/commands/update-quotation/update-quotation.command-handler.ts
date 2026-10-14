import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { QUOTATION_REPO } from '../../../../constants';
import { IQuotationRepo } from '../../i-quotation.repo';
import { Quotation } from '../../domain';
import { UpdateQuotationCommand } from './update-quotation.command';
import { calculateQuotationTotals } from '../../helpers';

@CommandHandlerStrict(UpdateQuotationCommand)
export class UpdateQuotationCommandHandler
  implements ICommandHandler<UpdateQuotationCommand, Quotation>
{
  constructor(
    @Inject(QUOTATION_REPO) private readonly quotationRepo: IQuotationRepo,
    @InjectPinoLogger(UpdateQuotationCommandHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateQuotationCommand): Promise<Quotation> {
    this.logger.info(`Executing ${UpdateQuotationCommand.name} for ${command.id}`);

    return this.quotationRepo.updateWithItemsAsync({
      id: command.id,
      organizationId: command.organizationId,
      locationId: command.locationId,
      customerId: command.customerId,
      notes: command.notes,
      totals: command.items ? calculateQuotationTotals(command.items) : undefined,
    });
  }
}
