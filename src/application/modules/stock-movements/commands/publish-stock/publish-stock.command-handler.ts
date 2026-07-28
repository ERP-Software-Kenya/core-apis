import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { StockOrchestrationService } from 'src/application/shared';
import { PublishStockCommand } from './publish-stock.command';

@CommandHandlerStrict(PublishStockCommand)
export class PublishStockCommandHandler implements ICommandHandler<PublishStockCommand, void> {
  constructor(
    private readonly orchestrator: StockOrchestrationService,
    @InjectPinoLogger(PublishStockCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: PublishStockCommand): Promise<void> {
    this.logger.info(`Executing ${PublishStockCommand.name} inventoryId=${command.inventoryId}`);
    await this.orchestrator.publishStock(command);
  }
}
