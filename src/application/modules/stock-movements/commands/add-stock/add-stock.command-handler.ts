import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { StockOrchestrationService } from 'src/application/shared';
import { AddStockCommand } from './add-stock.command';

@CommandHandlerStrict(AddStockCommand)
export class AddStockCommandHandler implements ICommandHandler<AddStockCommand, void> {
  constructor(
    private readonly orchestrator: StockOrchestrationService,
    @InjectPinoLogger(AddStockCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: AddStockCommand): Promise<void> {
    this.logger.info(`Executing ${AddStockCommand.name} inventoryId=${command.inventoryId}`);
    await this.orchestrator.addStock(command);
  }
}
