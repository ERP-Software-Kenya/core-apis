import { AutoMap } from '@automapper/classes';

export class UserProfile {
  @AutoMap() public id: string;
  @AutoMap() public userId: string;
  @AutoMap() public firstName: string;
  @AutoMap() public lastName: string;
  @AutoMap() public avatar?: string;
  @AutoMap() public timezone: string;
  @AutoMap() public locale: string;
}

export class User {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public clerkUserId?: string;
  @AutoMap() public firstName: string;
  @AutoMap() public lastName: string;
  @AutoMap() public email: string;
  @AutoMap() public phone?: string;
  @AutoMap() public avatarUrl?: string;
  @AutoMap() public isActive: boolean;
  @AutoMap(() => Date) public lastLoginAt?: Date;
  @AutoMap(() => UserProfile) public profile?: UserProfile;
  @AutoMap(() => Date) public createdAt: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
