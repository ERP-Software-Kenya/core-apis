import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer, IPageable } from '../../../../../common';
import { LANGUAGE_REPO } from '../../../../../application/constants';
import { Language, LanguageFilter } from '../../domain';
import { ILanguageRepo } from '../../i-language.repo';
import { LanguageFilterNormalizer } from '../../helpers';
import { SearchLanguagesQuery } from './search-languages.query';

@QueryHandlerStrict(SearchLanguagesQuery)
export class SearchLanguagesQueryHandler implements IQueryHandler<SearchLanguagesQuery, IPageable<Language>> {
  constructor(
    @Inject(LANGUAGE_REPO) protected readonly repo: ILanguageRepo,
    @Inject(LanguageFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<LanguageFilter, number>,
    @InjectPinoLogger(SearchLanguagesQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchLanguagesQuery): Promise<IPageable<Language>> {
    this.logger.info(`Executing Query "${SearchLanguagesQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
