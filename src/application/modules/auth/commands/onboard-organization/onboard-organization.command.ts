import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class OnboardOrganizationCommand extends CommandBase {
  @AutoMap() public clerkUserId: string;
  @AutoMap() public dbUserId: string;
  @AutoMap() public name: string;
  @AutoMap() public slug?: string;
  @AutoMap() public clerkOrgId?: string;
  @AutoMap() public logoUrl?: string;
}
