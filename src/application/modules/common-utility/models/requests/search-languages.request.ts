import { AutoMap } from "@automapper/classes";
import { Type } from "class-transformer";
import { PageableFilter } from '../../../../../common';
import { LanguageFilter } from '../../domain';
import { ListLanguagesRequest } from './list-languages.request';

export class SearchLanguagesRequest extends ListLanguagesRequest implements PageableFilter<LanguageFilter, number> {
  @Type(() => Number) @AutoMap() public $page?: number;
  @Type(() => Number) @AutoMap() public $perPage?: number;
}
