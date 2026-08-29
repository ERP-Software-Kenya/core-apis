import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CommandHandlerStrict } from '../../../../../common';
import { RpcBadRequestException } from '../../../../../common/exceptions/base/rpc-bad-request.exception';
import { RpcNotFoundException } from '../../../../../common/exceptions/base/rpc-not-found.exception';
import { TripStopEntity } from '../../../../../infrastructure/persistence/entities';
import { TripOperationsMailService } from '../../mail/trip-operations-mail.service';
import { InitiateDeliveryOtpCommand, InitiateDeliveryOtpResult } from './initiate-delivery-otp.command';

const OTP_EXPIRY_MINUTES = 10;
const RESEND_COOLDOWN_SECONDS = 590;
const BCRYPT_ROUNDS = 10;

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return '***@***.***';
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}

@CommandHandlerStrict(InitiateDeliveryOtpCommand)
export class InitiateDeliveryOtpCommandHandler
  implements ICommandHandler<InitiateDeliveryOtpCommand, InitiateDeliveryOtpResult> {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly mailService: TripOperationsMailService,
    @InjectPinoLogger(InitiateDeliveryOtpCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: InitiateDeliveryOtpCommand): Promise<InitiateDeliveryOtpResult> {
    this.logger.info(`Executing Command '${InitiateDeliveryOtpCommand.name}' stopId=${command.stopId}`);

    const stopRepo = this.dataSource.getRepository(TripStopEntity);
    const stop = await stopRepo.findOne({
      where: { id: command.stopId, tripId: command.tripId },
      relations: ['order', 'order.customer'],
    });

    if (!stop) {
      throw new RpcNotFoundException('Trip stop not found');
    }

    if (stop.otpExpiresAt) {
      const sentAt = new Date(stop.otpExpiresAt.getTime() - OTP_EXPIRY_MINUTES * 60 * 1000);
      const elapsedSeconds = (Date.now() - sentAt.getTime()) / 1000;
      if (elapsedSeconds < RESEND_COOLDOWN_SECONDS) {
        throw new RpcBadRequestException('OTP was recently sent. Please wait before requesting again');
      }
    }

    const otp = crypto.randomInt(100000, 999999).toString().padStart(6, '0');
    const otpHash = await bcrypt.hash(otp, BCRYPT_ROUNDS);
    const otpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await stopRepo.update(stop.id, { otpCode: otpHash, otpExpiresAt });

    const customerEmail = stop.order?.customer?.email;
    if (!customerEmail) {
      throw new RpcBadRequestException('Customer email not available for OTP delivery');
    }

    await this.mailService
      .sendDeliveryOtpAsync(customerEmail, otp, OTP_EXPIRY_MINUTES)
      .catch((err: Error) =>
        this.logger.warn({ error: err.message }, 'OTP email send failed — non-fatal'),
      );

    return { maskedEmail: maskEmail(customerEmail) };
  }
}
