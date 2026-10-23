import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { EActivityAction } from '../../../../../infrastructure/persistence/entities/activity-log.entity';
import { BRANCH_REPO, LOCATION_REPO, ROLE_REPO, USER_REPO, USER_ROLE_REPO } from '../../../../constants';
import { ActivityLogService } from '../../../../shared';
import { Branch } from '../../domain';
import { IBranchRepo } from '../..';
import { ILocationRepo } from '../../../locations';
import { assignLocationsToBranch, assertBranchManagerAssignment, loadBranchLocationIds } from '../../helpers';
import { IUserRepo } from '../../../users';
import { IRoleRepo } from '../../../roles';
import { IUserRoleRepo } from '../../../user-roles';
import { CreateBranchCommand } from './create-branch.command';

@CommandHandlerStrict(CreateBranchCommand)
export class CreateBranchCommandHandler implements ICommandHandler<CreateBranchCommand, Branch> {
  constructor(
    @Inject(BRANCH_REPO) private readonly repo: IBranchRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    @Inject(ROLE_REPO) private readonly roleRepo: IRoleRepo,
    @Inject(USER_ROLE_REPO) private readonly userRoleRepo: IUserRoleRepo,
    private readonly activityLog: ActivityLogService,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateBranchCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateBranchCommand): Promise<Branch> {
    this.logger.info(`Executing ${CreateBranchCommand.name}`);
    await assertBranchManagerAssignment(command.userId, command.organizationId, undefined, this.userRepo, this.roleRepo, this.userRoleRepo, this.repo);
    const branch = this.mapper.map(command, CreateBranchCommand, Branch);
    branch.isActive = true;
    const created = await this.repo.createAsync(branch);

    if (command.locationIds?.length) {
      await assignLocationsToBranch(this.locationRepo, {
        branchId: created.id,
        organizationId: command.organizationId,
        locationIds: command.locationIds,
      });
    }

    created.locationIds = await loadBranchLocationIds(this.locationRepo, created.id);
    this.activityLog.record({
      action: EActivityAction.BranchCreated,
      entityType: 'Branch',
      entityId: created.id,
      organizationId: command.organizationId,
      metadata: { name: created.name },
    });
    return created;
  }
}
