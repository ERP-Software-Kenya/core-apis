import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class CreateStoreCommand extends CommandBase {
  @AutoMap() public organizationId?: string;
  @AutoMap() public name: string;
  @AutoMap() public code?: string;
  @AutoMap() public address?: string;
  @AutoMap() public city?: string;
  @AutoMap() public state?: string;
  @AutoMap() public country?: string;
  @AutoMap() public phone?: string;
  @AutoMap() public email?: string;
}
