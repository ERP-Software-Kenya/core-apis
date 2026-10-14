jest.mock('@automapper/classes', () => ({ AutoMap: () => () => undefined }));

import { BadRequestException } from '@nestjs/common';
import { assertBranchManagerAssignment } from '../../../../../application/modules/branches/helpers/assert-branch-manager-assignment';

describe('assertBranchManagerAssignment', () => {
  const userRepo = { getAsync: jest.fn() };
  const roleRepo = { allAsync: jest.fn() };
  const userRoleRepo = { allByOrganizationAsync: jest.fn() };
  const branchRepo = { findByManagerIdAsync: jest.fn() };

  beforeEach(() => {
    jest.resetAllMocks();
    userRepo.getAsync.mockResolvedValue({ id: 'user-1', organizationId: 'org-1' });
    roleRepo.allAsync.mockResolvedValue([{ id: 'role-1', organizationId: 'org-1', name: 'branch_manager' }]);
    userRoleRepo.allByOrganizationAsync.mockResolvedValue([{ userId: 'user-1', roleId: 'role-1' }]);
    branchRepo.findByManagerIdAsync.mockResolvedValue(null);
  });

  const run = (currentBranchId?: string) => assertBranchManagerAssignment(
    'user-1', 'org-1', currentBranchId, userRepo as never, roleRepo as never,
    userRoleRepo as never, branchRepo as never,
  );

  it('accepts a same-org user with the branch manager role', async () => {
    await expect(run()).resolves.toBeUndefined();
  });

  it('rejects a user from another organization', async () => {
    userRepo.getAsync.mockResolvedValue({ id: 'user-1', organizationId: 'org-2' });
    await expect(run()).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects a user who already manages another branch', async () => {
    branchRepo.findByManagerIdAsync.mockResolvedValue({ id: 'branch-2' });
    await expect(run('branch-1')).rejects.toThrow('already manages another branch');
  });
});
