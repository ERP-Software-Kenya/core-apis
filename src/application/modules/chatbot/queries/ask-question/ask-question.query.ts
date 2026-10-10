import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class AskQuestionQuery extends QueryBase {
  @AutoMap() public question: string;
  @AutoMap() public organizationId: string;
}
