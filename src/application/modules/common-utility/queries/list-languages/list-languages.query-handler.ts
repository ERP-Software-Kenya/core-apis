import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer } from '../../../../../common';
import { LANGUAGE_REPO } from '../../../../../application/constants';
import { Language, LanguageFilter } from '../../domain';
import { ILanguageRepo } from '../../i-language.repo';
import { LanguageFilterNormalizer } from '../../helpers';
import { ListLanguagesQuery } from './list-languages.query';

@QueryHandlerStrict(ListLanguagesQuery)
export class ListLanguagesQueryHandler implements IQueryHandler<ListLanguagesQuery, Language[]> {
  constructor(
    @Inject(LANGUAGE_REPO) protected readonly repo: ILanguageRepo,
    @Inject(LanguageFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<LanguageFilter, number>,
    @InjectPinoLogger(ListLanguagesQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListLanguagesQuery): Promise<Language[]> {
    this.logger.info(`Executing Query "${ListLanguagesQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
