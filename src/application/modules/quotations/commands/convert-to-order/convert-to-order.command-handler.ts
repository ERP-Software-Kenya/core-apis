import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { ORDER_REPO } from '../../../../constants';
import { IOrderRepo } from '../../../orders/i-order.repo';
import { Order } from '../../../orders/domain';
import { ConvertToOrderCommand } from './convert-to-order.command';
import { EFulfillmentMode } from '../../../../shared/enums/e-fulfillment-mode';
import { QUOTATION_REPO } from '../../../../constants';
import { IQuotationRepo } from '../../i-quotation.repo';

@CommandHandlerStrict(ConvertToOrderCommand)
export class ConvertToOrderCommandHandler
  implements ICommandHandler<ConvertToOrderCommand, Order>
{
  constructor(
    @Inject(QUOTATION_REPO) private readonly quotationRepo: IQuotationRepo,
    @Inject(ORDER_REPO) private readonly orderRepo: IOrderRepo,
    @InjectPinoLogger(ConvertToOrderCommandHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ConvertToOrderCommand): Promise<Order> {
    this.logger.info(`Executing ${ConvertToOrderCommand.name} for quotation ${command.id}`);

    const orderId = await this.quotationRepo.convertToOrderAsync({
      id: command.id,
      organizationId: command.organizationId,
      fulfillmentMode: command.fulfillmentMode ?? EFulfillmentMode.Delivery,
      fulfillmentLocationId: command.fulfillmentLocationId,
    });

    const result = await this.orderRepo.getWithItemsAsync(orderId);
    if (!result) {
      throw new NotFoundException(`Generated order ${orderId} could not be retrieved`);
    }
    return result;
  }
}
