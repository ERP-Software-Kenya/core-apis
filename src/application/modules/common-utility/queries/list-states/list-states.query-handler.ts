import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer } from '../../../../../common';
import { STATE_REPO } from '../../../../../application/constants';
import { State, StateFilter } from '../../domain';
import { IStateRepo } from '../../i-state.repo';
import { StateFilterNormalizer } from '../../helpers';
import { ListStatesQuery } from './list-states.query';

@QueryHandlerStrict(ListStatesQuery)
export class ListStatesQueryHandler implements IQueryHandler<ListStatesQuery, State[]> {
  constructor(
    @Inject(STATE_REPO) protected readonly repo: IStateRepo,
    @Inject(StateFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<StateFilter, number>,
    @InjectPinoLogger(ListStatesQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListStatesQuery): Promise<State[]> {
    this.logger.info(`Executing Query "${ListStatesQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
