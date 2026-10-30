import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class ValidatePublicInvitationQuery extends QueryBase {
  @AutoMap() public rawToken: string;
}
