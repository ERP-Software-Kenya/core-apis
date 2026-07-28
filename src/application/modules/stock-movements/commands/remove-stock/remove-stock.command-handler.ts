import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { StockOrchestrationService } from 'src/application/shared';
import { RemoveStockCommand } from './remove-stock.command';

@CommandHandlerStrict(RemoveStockCommand)
export class RemoveStockCommandHandler implements ICommandHandler<RemoveStockCommand, void> {
  constructor(
    private readonly orchestrator: StockOrchestrationService,
    @InjectPinoLogger(RemoveStockCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RemoveStockCommand): Promise<void> {
    this.logger.info(`Executing ${RemoveStockCommand.name} inventoryId=${command.inventoryId}`);
    await this.orchestrator.removeStock(command);
  }
}
