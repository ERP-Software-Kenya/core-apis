import { AutoMap } from "@automapper/classes";
import { PageableFilter } from '../../../../../common';
import { LanguageFilter } from '../../domain';
import { ListLanguagesQuery } from '../list-languages/list-languages.query';

export class SearchLanguagesQuery extends ListLanguagesQuery implements PageableFilter<LanguageFilter, number> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
