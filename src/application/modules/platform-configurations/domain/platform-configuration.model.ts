import { AutoMap } from '@automapper/classes';

export class PlatformConfiguration {
  @AutoMap() public id: string;
  @AutoMap() public configKey: string;
  @AutoMap() public configValue: Record<string, any>;
  @AutoMap() public description?: string;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
