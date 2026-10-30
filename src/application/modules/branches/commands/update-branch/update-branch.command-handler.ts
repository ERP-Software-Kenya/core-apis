import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BRANCH_REPO, LOCATION_REPO, ROLE_REPO, USER_REPO, USER_ROLE_REPO } from '../../../../constants';
import { Branch } from '../../domain';
import { IBranchRepo } from '../..';
import { ILocationRepo } from '../../../locations';
import { assignLocationsToBranch, assertBranchManagerAssignment, loadBranchLocationIds } from '../../helpers';
import { IUserRepo } from '../../../users';
import { IRoleRepo } from '../../../roles';
import { IUserRoleRepo } from '../../../user-roles';
import { UpdateBranchCommand } from './update-branch.command';

@CommandHandlerStrict(UpdateBranchCommand)
export class UpdateBranchCommandHandler implements ICommandHandler<UpdateBranchCommand, Branch> {
  constructor(
    @Inject(BRANCH_REPO) private readonly repo: IBranchRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    @Inject(ROLE_REPO) private readonly roleRepo: IRoleRepo,
    @Inject(USER_ROLE_REPO) private readonly userRoleRepo: IUserRoleRepo,
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
    if (command.isActive === false && existing.isMain) {
      throw new BadRequestException('The main branch cannot be deactivated. Set another branch as main first.');
    }
    await assertBranchManagerAssignment(command.userId, command.organizationId, command.id, this.userRepo, this.roleRepo, this.userRoleRepo, this.repo);

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
