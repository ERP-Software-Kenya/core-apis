import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetPlatformConfigurationQuery extends QueryBase {
  @AutoMap() public id: string;
}
