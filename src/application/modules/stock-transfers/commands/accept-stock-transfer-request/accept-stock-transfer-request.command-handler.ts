import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PUSH_NOTIFICATION_SERVICE, IPushNotificationService } from '../../../../../common';
import { STOCK_TRANSFER_REQUEST_REPO } from '../../../../constants';
import { StockTransferRequest } from '../../domain';
import { IStockTransferRequestRepo } from '../../i-stock-transfer-request.repo';
import { AcceptStockTransferRequestCommand } from './accept-stock-transfer-request.command';

@CommandHandlerStrict(AcceptStockTransferRequestCommand)
export class AcceptStockTransferRequestCommandHandler implements ICommandHandler<AcceptStockTransferRequestCommand, StockTransferRequest> {
  constructor(
    @Inject(STOCK_TRANSFER_REQUEST_REPO) private readonly repo: IStockTransferRequestRepo,
    @Inject(PUSH_NOTIFICATION_SERVICE) private readonly pushNotification: IPushNotificationService,
    @InjectPinoLogger(AcceptStockTransferRequestCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: AcceptStockTransferRequestCommand): Promise<StockTransferRequest> {
    this.logger.info("Executing Command 'AcceptStockTransferRequestCommand'");

    const updated = await this.repo.acceptAsync(command);

    await this.notifyRequestingStoreAsync(command, updated);

    return updated;
  }

  private async notifyRequestingStoreAsync(command: AcceptStockTransferRequestCommand, request: StockTransferRequest): Promise<void> {
    try {
      const userIds = await this.repo.findUsersForLocationAsync(command.organizationId, request.requestingLocationId);
      await this.pushNotification.sendBatchAsync(
        userIds.map((userId) => ({
          userId,
          organizationId: command.organizationId,
          type:           'STOCK_REQUEST_ACCEPTED',
          title:          'Stock Request Accepted',
          body:           `Your stock request has been accepted. Stock is on the way.`,
        })),
      );
    } catch (err) {
      const error = err as Error;
      this.logger.warn({ error: error.message }, 'Failed to send accept notification');
    }
  }
}
