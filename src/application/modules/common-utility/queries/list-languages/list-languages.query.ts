import { AutoMap } from "@automapper/classes";
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { LanguageFilter } from '../../domain';

export class ListLanguagesQuery extends QueryBase implements Filter<LanguageFilter, number> {
  @AutoMap() public name?: string;
  @AutoMap(() => Array) public $ids?: number[];
  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
