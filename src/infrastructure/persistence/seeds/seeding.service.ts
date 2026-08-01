import { Injectable } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { RolesSeed } from './roles.seed';
import { CategoriesSeed } from './categories.seed';
import { RefCountriesSeed } from './ref-countries.seed';
import { RefStatesSeed } from './ref-states.seed';
import { RefCitiesSeed } from './ref-cities.seed';
import { RefCurrenciesSeed } from './ref-currencies.seed';
import { RefLanguagesSeed } from './ref-languages.seed';

/**
 * Orchestrates all seeds in strict dependency order.
 * Seeds with no FK dependencies run first; org/user seeds before
 * store seeds, etc.
 */
@Injectable()
export class SeedingService {
  constructor(
    @InjectPinoLogger(SeedingService.name)
    protected readonly logger: PinoLogger,
    private readonly rolesSeed: RolesSeed,
    private readonly categoriesSeed: CategoriesSeed,
    private readonly refCountriesSeed: RefCountriesSeed,
    private readonly refStatesSeed: RefStatesSeed,
    private readonly refCitiesSeed: RefCitiesSeed,
    private readonly refCurrenciesSeed: RefCurrenciesSeed,
    private readonly refLanguagesSeed: RefLanguagesSeed,
  ) {}

  public async runAsync(): Promise<void> {
    this.logger.info('Applying seeds...');
    await this.refCurrenciesSeed.runAsync();
    await this.refLanguagesSeed.runAsync();
    await this.refCountriesSeed.runAsync();
    await this.refStatesSeed.runAsync();
    await this.refCitiesSeed.runAsync();  
    await this.rolesSeed.runAsync();
    await this.categoriesSeed.runAsync();
    this.logger.info('All seeds applied successfully');
  }
}
