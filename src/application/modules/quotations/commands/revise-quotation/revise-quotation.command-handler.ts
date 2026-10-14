import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { QUOTATION_REPO } from '../../../../constants';
import { IQuotationRepo } from '../../i-quotation.repo';
import { Quotation } from '../../domain';
import { ReviseQuotationCommand } from './revise-quotation.command';

@CommandHandlerStrict(ReviseQuotationCommand)
export class ReviseQuotationCommandHandler
  implements ICommandHandler<ReviseQuotationCommand, Quotation>
{
  constructor(
    @Inject(QUOTATION_REPO) private readonly quotationRepo: IQuotationRepo,
    @InjectPinoLogger(ReviseQuotationCommandHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ReviseQuotationCommand): Promise<Quotation> {
    this.logger.info(`Executing ${ReviseQuotationCommand.name} for quotation ${command.id}`);

    return this.quotationRepo.reviseAsync(
      command.id,
      command.organizationId,
      command.createdByUserId,
    );
  }
}
