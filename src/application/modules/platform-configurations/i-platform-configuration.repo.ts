import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { PlatformConfiguration } from './domain';

export type PlatformConfigurationFilter = Record<string, never>;

export type IPlatformConfigurationRepo = IBaseRepo<PlatformConfiguration, string, PageableFilter<PlatformConfigurationFilter>, Filter<PlatformConfigurationFilter>>;
