import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import * as bcrypt from 'bcrypt';
import { CommandHandlerStrict } from '../../../../../common';
import { CentrifugalService } from '../../../../../common/centrifugal';
import { TRIP_STOP_REPO, ORDER_REPO, TRIP_REPO } from '../../../../../application/constants';
import { ITripStopRepo } from '../../repositories/i-trip-stop.repo';
import { IOrderRepo } from '../../../orders';
import { ITripRepo } from '../../../trips/repositories/i-trip.repo';
import { ETripStopStatus } from '../../../../shared/enums/e-trip-stop-status';
import { ETripStatus } from '../../../../shared/enums/e-trip-status';
import { EOrderStatus } from '../../../../shared/enums/e-order-status';
import {
  TripStopNotFoundException,
  OtpNotInitiatedException,
  OtpExpiredException,
  InvalidOtpException,
} from '../../exceptions';
import { ConfirmDeliveryOtpCommand } from './confirm-delivery-otp.command';

@CommandHandlerStrict(ConfirmDeliveryOtpCommand)
export class ConfirmDeliveryOtpCommandHandler implements ICommandHandler<ConfirmDeliveryOtpCommand, boolean> {
  public constructor(
    @Inject(TRIP_STOP_REPO) private readonly stopRepo: ITripStopRepo,
    @Inject(ORDER_REPO) private readonly orderRepo: IOrderRepo,
    @Inject(TRIP_REPO) private readonly tripRepo: ITripRepo,
    private readonly centrifugal: CentrifugalService,
    @InjectPinoLogger(ConfirmDeliveryOtpCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ConfirmDeliveryOtpCommand): Promise<boolean> {
    this.logger.info(`Executing Command '${ConfirmDeliveryOtpCommand.name}' stopId=${command.stopId}`);

    const stop = await this.stopRepo.findByTripAndStopAsync(command.tripId, command.stopId);
    if (!stop) throw new TripStopNotFoundException();

    if (!stop.otpCode || !stop.otpExpiresAt) {
      throw new OtpNotInitiatedException();
    }
    if (stop.otpExpiresAt < new Date()) {
      throw new OtpExpiredException();
    }

    const valid = await bcrypt.compare(command.otp, stop.otpCode);
    if (!valid) throw new InvalidOtpException();

    const now = new Date();
    await this.stopRepo.markDeliveredAsync(stop.id, now);

    const order = await this.orderRepo.getAsync(stop.orderId);
    if (order) {
      order.status = EOrderStatus.Delivered;
      await this.orderRepo.updateAsync(order);
    }

    await this.maybeCompleteTripAsync(command.tripId, command.driverUserId);
    return true;
  }

  private async maybeCompleteTripAsync(tripId: string, driverId: string): Promise<void> {
    const allStops = await this.stopRepo.findAllByTripAsync(tripId);
    const allDelivered = allStops.every((stop) => stop.status === ETripStopStatus.Delivered);
    if (!allDelivered) return;

    const trip = await this.tripRepo.getAsync(tripId);
    if (!trip) return;

    trip.tripStatus = ETripStatus.Completed;
    await this.tripRepo.updateAsync(trip);

    await this.centrifugal
      .publish(`user_${driverId}`, { type: 'trip:completed', tripId, tripNumber: trip.tripNumber })
      .catch((err: Error) =>
        this.logger.warn({ error: err.message }, 'Centrifugo trip:completed publish failed — non-fatal'),
      );
  }
}
