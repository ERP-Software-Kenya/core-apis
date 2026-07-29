import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { StockOrchestrationService } from 'src/application/shared';
import { AddUnpublishedStockCommand } from './add-unpublished-stock.command';

@CommandHandlerStrict(AddUnpublishedStockCommand)
export class AddUnpublishedStockCommandHandler implements ICommandHandler<AddUnpublishedStockCommand, void> {
  constructor(
    private readonly orchestrator: StockOrchestrationService,
    @InjectPinoLogger(AddUnpublishedStockCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: AddUnpublishedStockCommand): Promise<void> {
    this.logger.info(`Executing ${AddUnpublishedStockCommand.name} locationId=${command.locationId} productId=${command.productId}`);
    await this.orchestrator.addUnpublishedStock(command);
  }
}
