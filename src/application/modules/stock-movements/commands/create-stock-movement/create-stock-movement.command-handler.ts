import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { STOCK_MOVEMENT_REPO } from '../../../../constants';
import { StockMovement } from '../../domain';
import { IStockMovementRepo } from '../..';
import { CreateStockMovementCommand } from './create-stock-movement.command';

@CommandHandlerStrict(CreateStockMovementCommand)
export class CreateStockMovementCommandHandler implements ICommandHandler<CreateStockMovementCommand, StockMovement> {
  constructor(
    @Inject(STOCK_MOVEMENT_REPO) private readonly repo: IStockMovementRepo,
    @InjectPinoLogger(CreateStockMovementCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateStockMovementCommand): Promise<StockMovement> {
    this.logger.info(`Executing ${CreateStockMovementCommand.name}`);
    return this.repo.createAsync(command as any);
  }
}
