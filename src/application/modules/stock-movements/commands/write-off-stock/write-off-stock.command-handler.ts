import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { StockOrchestrationService } from 'src/application/shared';
import { WriteOffStockCommand } from './write-off-stock.command';

@CommandHandlerStrict(WriteOffStockCommand)
export class WriteOffStockCommandHandler implements ICommandHandler<WriteOffStockCommand, void> {
  constructor(
    private readonly orchestrator: StockOrchestrationService,
    @InjectPinoLogger(WriteOffStockCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: WriteOffStockCommand): Promise<void> {
    this.logger.info(`Executing ${WriteOffStockCommand.name} inventoryId=${command.inventoryId}`);
    await this.orchestrator.writeOffStock(command);
  }
}
