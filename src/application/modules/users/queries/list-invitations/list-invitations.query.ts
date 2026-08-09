import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';
import { EInvitationStatus } from '../../../../../infrastructure/e-invitation-status';

export class ListInvitationsQuery extends QueryBase {
  @AutoMap(() => String) public status?: EInvitationStatus;
}
