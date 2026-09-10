import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BRANCH_REPO, LOCATION_REPO } from '../../../../constants';
import { Branch } from '../../domain';
import { IBranchRepo } from '../..';
import { ILocationRepo } from '../../../locations';
import { assignLocationsToBranch, loadBranchLocationIds } from '../../helpers/branch-location.util';
import { UpdateBranchCommand } from './update-branch.command';

@CommandHandlerStrict(UpdateBranchCommand)
export class UpdateBranchCommandHandler implements ICommandHandler<UpdateBranchCommand, Branch> {
  constructor(
    @Inject(BRANCH_REPO) private readonly repo: IBranchRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateBranchCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateBranchCommand): Promise<Branch> {
    this.logger.info(`Executing ${UpdateBranchCommand.name}`);
    const existing = await this.repo.getAsync(command.id);
    if (!existing) throw new NotFoundException(`Branch ${command.id} not found`);
    if (existing.organizationId !== command.organizationId) {
      throw new NotFoundException(`Branch ${command.id} not found`);
    }

    const patch = this.mapper.map(command, UpdateBranchCommand, Branch);
    patch.id = command.id;
    patch.organizationId = command.organizationId;
    const updated = await this.repo.updateAsync(patch);

    if (command.locationIds !== undefined) {
      await assignLocationsToBranch(this.locationRepo, {
        branchId: command.id,
        organizationId: command.organizationId,
        locationIds: command.locationIds,
      });
    }

    updated.locationIds = await loadBranchLocationIds(this.locationRepo, command.id);
    return updated;
  }
}
