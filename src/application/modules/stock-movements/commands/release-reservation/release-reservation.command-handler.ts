import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { StockOrchestrationService } from 'src/application/shared';
import { ReleaseReservationCommand } from './release-reservation.command';

@CommandHandlerStrict(ReleaseReservationCommand)
export class ReleaseReservationCommandHandler implements ICommandHandler<ReleaseReservationCommand, void> {
  constructor(
    private readonly orchestrator: StockOrchestrationService,
    @InjectPinoLogger(ReleaseReservationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ReleaseReservationCommand): Promise<void> {
    this.logger.info(`Executing ${ReleaseReservationCommand.name} inventoryId=${command.inventoryId}`);
    await this.orchestrator.releaseReservation(command);
  }
}
