import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer, IPageable } from '../../../../../common';
import { STATE_REPO } from '../../../../../application/constants';
import { State, StateFilter } from '../../domain';
import { IStateRepo } from '../../i-state.repo';
import { StateFilterNormalizer } from '../../helpers';
import { SearchStatesQuery } from './search-states.query';

@QueryHandlerStrict(SearchStatesQuery)
export class SearchStatesQueryHandler implements IQueryHandler<SearchStatesQuery, IPageable<State>> {
  constructor(
    @Inject(STATE_REPO) protected readonly repo: IStateRepo,
    @Inject(StateFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<StateFilter, number>,
    @InjectPinoLogger(SearchStatesQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchStatesQuery): Promise<IPageable<State>> {
    this.logger.info(`Executing Query "${SearchStatesQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
