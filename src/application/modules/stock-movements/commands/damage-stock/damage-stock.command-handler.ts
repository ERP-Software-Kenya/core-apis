import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { StockOrchestrationService } from 'src/application/shared';
import { DamageStockCommand } from './damage-stock.command';

@CommandHandlerStrict(DamageStockCommand)
export class DamageStockCommandHandler implements ICommandHandler<DamageStockCommand, void> {
  constructor(
    private readonly orchestrator: StockOrchestrationService,
    @InjectPinoLogger(DamageStockCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DamageStockCommand): Promise<void> {
    this.logger.info(`Executing ${DamageStockCommand.name} inventoryId=${command.inventoryId}`);
    await this.orchestrator.damageStock(command);
  }
}
