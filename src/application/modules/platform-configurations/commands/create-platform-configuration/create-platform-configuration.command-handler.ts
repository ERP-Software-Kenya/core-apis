import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PLATFORM_CONFIGURATION_REPO } from '../../../../constants';
import { PlatformConfiguration } from '../../domain';
import { IPlatformConfigurationRepo } from '../..';
import { CreatePlatformConfigurationCommand } from './create-platform-configuration.command';

@CommandHandlerStrict(CreatePlatformConfigurationCommand)
export class CreatePlatformConfigurationCommandHandler implements ICommandHandler<CreatePlatformConfigurationCommand, PlatformConfiguration> {
  constructor(
    @Inject(PLATFORM_CONFIGURATION_REPO) private readonly repo: IPlatformConfigurationRepo,
    @InjectPinoLogger(CreatePlatformConfigurationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreatePlatformConfigurationCommand): Promise<PlatformConfiguration> {
    this.logger.info(`Executing ${CreatePlatformConfigurationCommand.name}`);
    return this.repo.createAsync(command as any);
  }
}
