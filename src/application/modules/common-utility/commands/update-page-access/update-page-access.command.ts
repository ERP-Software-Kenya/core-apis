import { CommandBase } from '../../../../../common';

export class UpdatePageAccessCommand extends CommandBase {
  public configs: ReadonlyArray<{ pageKey: string; allowedRoles: string[] }>;
}
