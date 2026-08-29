import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { UserDeviceTokenEntity } from '../../../../../infrastructure/persistence/entities';
import { RegisterDeviceCommand } from './register-device.command';

@CommandHandlerStrict(RegisterDeviceCommand)
export class RegisterDeviceCommandHandler implements ICommandHandler<RegisterDeviceCommand, boolean> {
  public constructor(
    private readonly dataSource: DataSource,
    @InjectPinoLogger(RegisterDeviceCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RegisterDeviceCommand): Promise<boolean> {
    this.logger.info(`Executing Command '${RegisterDeviceCommand.name}' userId=${command.userId}`);

    const repo = this.dataSource.getRepository(UserDeviceTokenEntity);
    const existing = await repo.findOne({
      where: { userId: command.userId, token: command.token },
    });

    if (existing) {
      await repo.update(existing.id, { platform: command.platform });
    } else {
      const newToken = repo.create({
        userId: command.userId,
        token: command.token,
        platform: command.platform,
      });
      await repo.save(newToken);
    }

    return true;
  }
}
