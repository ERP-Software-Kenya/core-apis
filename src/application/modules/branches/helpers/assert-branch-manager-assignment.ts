import { BadRequestException } from '@nestjs/common';
import { ERole } from '../../../../infrastructure/persistence/entities/role.entity';
import { IRoleRepo } from '../../roles';
import { IUserRoleRepo } from '../../user-roles';
import { IUserRepo } from '../../users';
import { IBranchRepo } from '../i-branch.repo';

export async function assertBranchManagerAssignment(
  userId: string | null | undefined,
  organizationId: string,
  currentBranchId: string | undefined,
  userRepo: IUserRepo,
  roleRepo: IRoleRepo,
  userRoleRepo: IUserRoleRepo,
  branchRepo: IBranchRepo,
): Promise<void> {
  if (!userId) return;
  const user = await userRepo.getAsync(userId);
  if (!user || user.organizationId !== organizationId || !user.isActive) {
    throw new BadRequestException('Branch manager must belong to the same organization.');
  }
  const roles = await roleRepo.allAsync({});
  // Roles are global reference data. Organization membership is established by
  // the user-role assignment, not by the role record itself.
  const branchManagerRole = roles.find((role) => role.name === ERole.BranchManager);
  const assignments = await userRoleRepo.allByOrganizationAsync(organizationId);
  if (!branchManagerRole || !assignments.some((assignment) =>
    assignment.userId === userId && assignment.roleId === branchManagerRole.id)) {
    throw new BadRequestException('Selected user must have the Branch Manager role.');
  }
  const existing = await branchRepo.findByManagerIdAsync(userId);
  if (existing && existing.id !== currentBranchId) {
    throw new BadRequestException('Selected user already manages another branch.');
  }
}
