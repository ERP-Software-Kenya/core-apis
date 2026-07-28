import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { StockOrchestrationService } from 'src/application/shared';
import { AdjustStockCommand } from './adjust-stock.command';

@CommandHandlerStrict(AdjustStockCommand)
export class AdjustStockCommandHandler implements ICommandHandler<AdjustStockCommand, void> {
  constructor(
    private readonly orchestrator: StockOrchestrationService,
    @InjectPinoLogger(AdjustStockCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: AdjustStockCommand): Promise<void> {
    this.logger.info(`Executing ${AdjustStockCommand.name} inventoryId=${command.inventoryId}`);
    await this.orchestrator.adjustStock(command);
  }
}
