import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { StockOrchestrationService } from 'src/application/shared';
import { ReserveStockCommand } from './reserve-stock.command';

@CommandHandlerStrict(ReserveStockCommand)
export class ReserveStockCommandHandler implements ICommandHandler<ReserveStockCommand, void> {
  constructor(
    private readonly orchestrator: StockOrchestrationService,
    @InjectPinoLogger(ReserveStockCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ReserveStockCommand): Promise<void> {
    this.logger.info(`Executing ${ReserveStockCommand.name} inventoryId=${command.inventoryId}`);
    await this.orchestrator.reserveStock(command);
  }
}
