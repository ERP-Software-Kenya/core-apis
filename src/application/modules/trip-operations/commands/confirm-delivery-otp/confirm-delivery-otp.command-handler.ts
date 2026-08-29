import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CommandHandlerStrict } from '../../../../../common';
import { RpcBadRequestException } from '../../../../../common/exceptions/base/rpc-bad-request.exception';
import { RpcNotFoundException } from '../../../../../common/exceptions/base/rpc-not-found.exception';
import { CentrifugalService } from '../../../../../common/centrifugal';
import { TripStopEntity, TripEntity, OrderEntity } from '../../../../../infrastructure/persistence/entities';
import { ETripStopStatus } from '../../../../shared/enums/e-trip-stop-status';
import { ETripStatus } from '../../../../shared/enums/e-trip-status';
import { EOrderStatus } from '../../../../shared/enums/e-order-status';
import { ConfirmDeliveryOtpCommand } from './confirm-delivery-otp.command';

@CommandHandlerStrict(ConfirmDeliveryOtpCommand)
export class ConfirmDeliveryOtpCommandHandler implements ICommandHandler<ConfirmDeliveryOtpCommand, boolean> {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly centrifugal: CentrifugalService,
    @InjectPinoLogger(ConfirmDeliveryOtpCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ConfirmDeliveryOtpCommand): Promise<boolean> {
    this.logger.info(`Executing Command '${ConfirmDeliveryOtpCommand.name}' stopId=${command.stopId}`);

    const stopRepo = this.dataSource.getRepository(TripStopEntity);
    const stop = await stopRepo.findOne({
      where: { id: command.stopId, tripId: command.tripId },
    });

    if (!stop) {
      throw new RpcNotFoundException('Trip stop not found');
    }

    if (!stop.otpCode || !stop.otpExpiresAt) {
      throw new RpcBadRequestException('OTP not initiated for this stop');
    }

    if (stop.otpExpiresAt < new Date()) {
      throw new RpcBadRequestException('OTP has expired');
    }

    const valid = await bcrypt.compare(command.otp, stop.otpCode);
    if (!valid) {
      throw new RpcBadRequestException('Invalid OTP');
    }

    const now = new Date();
    await stopRepo.update(stop.id, {
      otpVerifiedAt: now,
      deliveredAt: now,
      status: ETripStopStatus.Delivered,
    });

    await this.dataSource.getRepository(OrderEntity).update(stop.orderId, { status: EOrderStatus.Delivered });

    await this.checkTripCompletionAsync(command.tripId, command.driverUserId);

    return true;
  }

  private async checkTripCompletionAsync(tripId: string, driverId: string): Promise<void> {
    const allStops = await this.dataSource
      .getRepository(TripStopEntity)
      .find({ where: { tripId } });

    const allDelivered = allStops.every((stop) => stop.status === ETripStopStatus.Delivered);

    if (!allDelivered) return;

    const tripRepo = this.dataSource.getRepository(TripEntity);
    const trip = await tripRepo.findOne({ where: { id: tripId } });
    if (!trip) return;

    await tripRepo.update(tripId, { tripStatus: ETripStatus.Completed });

    await this.centrifugal
      .publish(`user_${driverId}`, {
        type: 'trip:completed',
        tripId,
        tripNumber: trip.tripNumber,
      })
      .catch((err: Error) =>
        this.logger.warn({ error: err.message }, 'Centrifugo trip:completed publish failed — non-fatal'),
      );
  }
}
