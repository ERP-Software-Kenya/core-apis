import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  CommandHandlerStrict,
  LocationAccessDeniedException,
  LocationNotFoundException,
  UserNotFoundException,
  UserRoleNotAllowedException,
  UserRoleNotFoundException,
} from '../../../../../common';
import { BRANCH_REPO, LOCATION_REPO, ROLE_REPO, USER_REPO, USER_ROLE_REPO } from '../../../../constants';
import { ERole } from '../../../../../infrastructure';
import { IBranchRepo } from '../../../branches';
import { ILocationRepo } from '../../../locations';
import { IRoleRepo } from '../../../roles';
import { IUserRepo } from '../../../users';
import { UserRole } from '../../domain';
import { IUserRoleRepo } from '../..';
import { assertRoleGrant } from '../../assert-role-grant';
import { UpdateUserRoleCommand } from './update-user-role.command';

@CommandHandlerStrict(UpdateUserRoleCommand)
export class UpdateUserRoleCommandHandler implements ICommandHandler<UpdateUserRoleCommand, UserRole> {
  constructor(
    @Inject(USER_ROLE_REPO) private readonly repo: IUserRoleRepo,
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    @Inject(ROLE_REPO) private readonly roleRepo: IRoleRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @Inject(BRANCH_REPO) private readonly branchRepo: IBranchRepo,
    @InjectPinoLogger(UpdateUserRoleCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateUserRoleCommand): Promise<UserRole> {
    this.logger.info(`Executing ${UpdateUserRoleCommand.name}`);

    const existing = await this.repo.getAsync(command.id);
    if (!existing) throw new UserRoleNotFoundException(command.id);

    if (command.locationId && command.branchId) {
      throw new UserRoleNotAllowedException();
    }

    const roleId = command.roleId ?? existing.roleId;
    await assertRoleGrant(this.userRepo, this.roleRepo, {
      userId: existing.userId,
      roleId,
      organizationId: command.organizationId,
      callerIsSuperAdmin: command.callerIsSuperAdmin,
    });

    const role = await this.roleRepo.getAsync(roleId);
    const locationId = command.locationId !== undefined ? command.locationId : existing.locationId;
    const branchId = command.branchId !== undefined ? command.branchId : existing.branchId;

    if (locationId && branchId) {
      throw new UserRoleNotAllowedException();
    }
    if (role?.name === ERole.BranchManager && !branchId) {
      throw new UserRoleNotAllowedException();
    }
    if (role?.name === ERole.BranchManager && locationId) {
      throw new UserRoleNotAllowedException();
    }

    if (locationId) {
      await this.assertLocationBelongsToUsersOrg(existing.userId, locationId);
    }
    if (branchId) {
      await this.assertBranchBelongsToUsersOrg(existing.userId, branchId);
    }

    const updated = new UserRole();
    updated.id = existing.id;
    updated.userId = existing.userId;
    updated.roleId = roleId;
    // updateAsync skips undefined-valued columns: omitted locationId/branchId leaves unchanged, explicit null clears.
    updated.locationId = command.locationId;
    updated.branchId = command.branchId;
    return this.repo.updateAsync(updated);
  }

  private async assertLocationBelongsToUsersOrg(userId: string, locationId: string): Promise<void> {
    const [user, location] = await Promise.all([this.userRepo.getAsync(userId), this.locationRepo.getAsync(locationId)]);
    if (!user) throw new UserNotFoundException(userId);
    if (!location) throw new LocationNotFoundException(locationId);
    if (location.organizationId !== user.organizationId) {
      throw new LocationAccessDeniedException(undefined, 'Location does not belong to the same organization as the user.');
    }
  }

  private async assertBranchBelongsToUsersOrg(userId: string, branchId: string): Promise<void> {
    const [user, branch] = await Promise.all([this.userRepo.getAsync(userId), this.branchRepo.getAsync(branchId)]);
    if (!user) throw new UserNotFoundException(userId);
    if (!branch || branch.organizationId !== user.organizationId) {
      throw new LocationAccessDeniedException(undefined, 'Branch does not belong to the same organization as the user.');
    }
  }
}
