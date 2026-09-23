import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { ORGANIZATION_REPO, TAX_REPO } from '../../../../constants';
import { Tax } from '../../../taxes/domain';
import { ITaxRepo } from '../../../taxes/i-tax.repo';
import { Organization } from '../../domain';
import { IOrganizationRepo } from '../..';
import { CreateOrganizationCommand } from './create-organization.command';

@CommandHandlerStrict(CreateOrganizationCommand)
export class CreateOrganizationCommandHandler implements ICommandHandler<CreateOrganizationCommand, Organization> {
  constructor(
    @Inject(ORGANIZATION_REPO) private readonly repo: IOrganizationRepo,
    @Inject(TAX_REPO) private readonly taxRepo: ITaxRepo,
    @InjectPinoLogger(CreateOrganizationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateOrganizationCommand): Promise<Organization> {
    this.logger.info(`Executing ${CreateOrganizationCommand.name}`);
    const organization = await this.repo.createAsync({ name: command.name } as Organization);
    await this.taxRepo.createAsync(Object.assign(new Tax(), {
      organizationId: organization.id,
      name: 'Standard Tax',
      rate: 16,
      isActive: true,
    }));
    return organization;
  }
}
