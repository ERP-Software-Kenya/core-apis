import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';
import { ERole } from '../../../../../infrastructure/persistence/entities';

export class UploadExpenseReceiptCommand extends CommandBase {
  @AutoMap() public expenseId: string;
  @AutoMap() public buffer: Buffer;
  @AutoMap() public mimeType: string;
  @AutoMap() public callerUserId: string;
  public callerRoles: ERole[];
}
