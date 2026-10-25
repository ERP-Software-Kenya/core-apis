import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PUSH_NOTIFICATION_SERVICE, IPushNotificationService } from '../../../../../common';
import { STOCK_TRANSFER_REQUEST_REPO } from '../../../../constants';
import { StockTransferRequest } from '../../domain';
import { IStockTransferRequestRepo } from '../../i-stock-transfer-request.repo';
import { ClaimStockTransferRequestCommand } from './claim-stock-transfer-request.command';

@CommandHandlerStrict(ClaimStockTransferRequestCommand)
export class ClaimStockTransferRequestCommandHandler implements ICommandHandler<ClaimStockTransferRequestCommand, StockTransferRequest> {
  constructor(
    @Inject(STOCK_TRANSFER_REQUEST_REPO) private readonly repo: IStockTransferRequestRepo,
    @Inject(PUSH_NOTIFICATION_SERVICE) private readonly pushNotification: IPushNotificationService,
    @InjectPinoLogger(ClaimStockTransferRequestCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ClaimStockTransferRequestCommand): Promise<StockTransferRequest> {
    this.logger.info("Executing Command 'ClaimStockTransferRequestCommand'");

    const updated = await this.repo.claimAsync(command);

    await this.notifyAcceptingStoreAsync(command, updated);

    return updated;
  }

  private async notifyAcceptingStoreAsync(command: ClaimStockTransferRequestCommand, request: StockTransferRequest): Promise<void> {
    if (!request.acceptedByLocationId) return;
    try {
      const userIds = await this.repo.findUsersForLocationAsync(command.organizationId, request.acceptedByLocationId);
      await this.pushNotification.sendBatchAsync(
        userIds.map((userId) => ({
          userId,
          organizationId: command.organizationId,
          type:           'STOCK_REQUEST_CLAIMED',
          title:          'Stock Received',
          body:           `The requesting store has confirmed receipt of the stock. Request is now complete.`,
        })),
      );
    } catch (err) {
      const error = err as Error;
      this.logger.warn({ error: error.message }, 'Failed to send claim notification');
    }
  }
}
