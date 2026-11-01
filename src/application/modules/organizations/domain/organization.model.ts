import { AutoMap } from '@automapper/classes';

export class Organization {
  @AutoMap() public id: string;
  @AutoMap() public name?: string;
  @AutoMap() public slug?: string;
  @AutoMap() public email?: string;
  @AutoMap() public phone?: string;
  @AutoMap() public country?: string;
  @AutoMap() public industry?: string;
  @AutoMap() public businessType?: string;
  @AutoMap() public teamSize?: string;
  @AutoMap(() => [String]) public modules?: string[];
  @AutoMap() public salesMethod?: string;
  @AutoMap() public taxId?: string;
  @AutoMap() public clerkOrgId?: string;
  @AutoMap() public logoUrl?: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
