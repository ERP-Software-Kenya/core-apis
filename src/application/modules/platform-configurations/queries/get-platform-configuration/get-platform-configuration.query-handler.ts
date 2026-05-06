import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { PLATFORM_CONFIGURATION_REPO } from '../../../../constants';
import { PlatformConfiguration } from '../../domain';
import { IPlatformConfigurationRepo } from '../..';
import { GetPlatformConfigurationQuery } from './get-platform-configuration.query';

@QueryHandlerStrict(GetPlatformConfigurationQuery)
export class GetPlatformConfigurationQueryHandler implements IQueryHandler<GetPlatformConfigurationQuery, PlatformConfiguration> {
  constructor(
    @Inject(PLATFORM_CONFIGURATION_REPO) private readonly repo: IPlatformConfigurationRepo,
    @InjectPinoLogger(GetPlatformConfigurationQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetPlatformConfigurationQuery): Promise<PlatformConfiguration> {
    this.logger.info(`Executing ${GetPlatformConfigurationQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
