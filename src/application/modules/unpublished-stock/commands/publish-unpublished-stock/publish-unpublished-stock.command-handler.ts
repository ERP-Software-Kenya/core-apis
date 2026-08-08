import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { StockOrchestrationService } from 'src/application/shared';
import { PublishUnpublishedStockCommand } from './publish-unpublished-stock.command';

@CommandHandlerStrict(PublishUnpublishedStockCommand)
export class PublishUnpublishedStockCommandHandler implements ICommandHandler<PublishUnpublishedStockCommand, void> {
  constructor(
    private readonly orchestrator: StockOrchestrationService,
    @InjectPinoLogger(PublishUnpublishedStockCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: PublishUnpublishedStockCommand): Promise<void> {
    this.logger.info(`Executing ${PublishUnpublishedStockCommand.name} unpublishedStockId=${command.unpublishedStockId}`);
    await this.orchestrator.publishStock(command);
  }
}
