import { BadRequestException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { IPushNotificationService, PUSH_NOTIFICATION_SERVICE } from '../../../../../common';
import { CentrifugalService } from '../../../../../common/centrifugal';
import { DRIVER_REPO, TRIP_REPO, ORDER_REPO } from '../../../../../application/constants';
import { IDriverRepo } from '../../../drivers/repositories/i-driver.repo';
import { ITripRepo } from '../../../trips/repositories/i-trip.repo';
import { IOrderRepo } from '../../../orders';
import { Trip } from '../../../trips/domain';
import { OrderDispatchPaymentService } from '../../../../shared/services/order-dispatch-payment.service';
import { CreateMultiStopTripCommand } from './create-multi-stop-trip.command';

@CommandHandlerStrict(CreateMultiStopTripCommand)
export class CreateMultiStopTripCommandHandler implements ICommandHandler<CreateMultiStopTripCommand, Trip> {
  public constructor(
    @Inject(TRIP_REPO) private readonly tripRepo: ITripRepo,
    @Inject(ORDER_REPO) private readonly orderRepo: IOrderRepo,
    @Inject(DRIVER_REPO) private readonly driverRepo: IDriverRepo,
    private readonly dispatchPaymentService: OrderDispatchPaymentService,
    private readonly centrifugal: CentrifugalService,
    @Inject(PUSH_NOTIFICATION_SERVICE) private readonly pushService: IPushNotificationService,
    @InjectPinoLogger(CreateMultiStopTripCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateMultiStopTripCommand): Promise<Trip> {
    this.logger.info(`Executing Command '${CreateMultiStopTripCommand.name}' driverId=${command.driverId}`);

    const driver = await this.driverRepo.getAsync(command.driverId);
    if (!driver || driver.organizationId !== command.organizationId || !driver.userId) {
      throw new BadRequestException('Driver must belong to the organization and be linked to a mobile user');
    }

    for (const stop of command.stops) {
      const order = await this.orderRepo.getAsync(stop.orderId);
      await this.dispatchPaymentService.assertCanDispatchAsync(stop.orderId, order?.orderNumber);
    }

    const trip = await this.tripRepo.createTripWithStopsAsync(
      command.driverId,
      command.vehicleId,
      command.stops,
    );

    await this.centrifugal
      .publish(`user_${driver.userId}`, {
        type: 'trip:assigned',
        tripId: trip.id,
        stopCount: command.stops.length,
      })
      .catch((err: Error) =>
        this.logger.warn({ error: err.message }, 'Centrifugo trip:assigned publish failed — non-fatal'),
      );

    await this.pushService
      .sendAsync({
        userId: driver.userId,
        organizationId: command.organizationId,
        type: 'trip:assigned',
        title: 'New Trip Assigned',
        body: `You have been assigned trip ${trip.tripNumber} with ${command.stops.length} stops`,
        data: { tripId: trip.id },
      })
      .catch((err: Error) =>
        this.logger.warn({ error: err.message }, 'Push send to driver failed — non-fatal'),
      );

    return trip;
  }
}
