import { AutoMap } from '@automapper/classes';

export class Tax {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public name: string;
  @AutoMap() public rate: number;
  @AutoMap() public description?: string;
  @AutoMap() public isActive: boolean;
  @AutoMap(() => Date) public createdAt: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
