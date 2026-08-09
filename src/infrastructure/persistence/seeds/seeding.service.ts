import { Injectable } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { RolesSeed } from './roles.seed';
import { RefCountriesSeed } from './ref-countries.seed';
import { RefStatesSeed } from './ref-states.seed';
import { RefCitiesSeed } from './ref-cities.seed';
import { RefCurrenciesSeed } from './ref-currencies.seed';
import { RefLanguagesSeed } from './ref-languages.seed';
import { EmailTemplatesSeed } from './email-templates.seed';
import { FuelTypesSeed } from './fuel-types.seed';
import { MaintenanceTypesSeed } from './maintenance-types.seed';
import { VehicleBrandsSeed } from './vehicle-brands.seed';
import { VehicleTypesSeed } from './vehicle-types.seed';

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
    private readonly refCountriesSeed: RefCountriesSeed,
    private readonly refStatesSeed: RefStatesSeed,
    private readonly refCitiesSeed: RefCitiesSeed,
    private readonly refCurrenciesSeed: RefCurrenciesSeed,
    private readonly refLanguagesSeed: RefLanguagesSeed,
    private readonly emailTemplatesSeed: EmailTemplatesSeed,
    private readonly maintenanceTypesSeed: MaintenanceTypesSeed,
    private readonly fuelTypesSeed: FuelTypesSeed,
    private readonly vehicleBrandsSeed: VehicleBrandsSeed,
    private readonly vehicleTypesSeed: VehicleTypesSeed
  ) {}

  public async runAsync(): Promise<void> {
    this.logger.info('Applying seeds...');
    await this.refCurrenciesSeed.runAsync();
    await this.refLanguagesSeed.runAsync();
    await this.refCountriesSeed.runAsync();
    await this.refStatesSeed.runAsync();
    await this.refCitiesSeed.runAsync();
    await this.fuelTypesSeed.runAsync();
    await this.maintenanceTypesSeed.runAsync();
    await this.vehicleBrandsSeed.runAsync();
    await this.vehicleTypesSeed.runAsync();
    await this.rolesSeed.runAsync();
    await this.emailTemplatesSeed.runAsync();
    this.logger.info('All seeds applied successfully');
  }
}
