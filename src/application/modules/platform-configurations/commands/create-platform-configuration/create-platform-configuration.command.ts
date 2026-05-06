import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreatePlatformConfigurationCommand extends CommandBase {
  @AutoMap() public configKey: string;
  @AutoMap() public configValue: Record<string, any>;
  @AutoMap() public description?: string;
}
