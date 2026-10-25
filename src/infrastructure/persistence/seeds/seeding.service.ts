import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PinoLogger, InjectPinoLogger } from "nestjs-pino";
import { RolesSeed } from "./roles.seed";
import { RefCountriesSeed } from "./ref-countries.seed";
import { RefStatesSeed } from "./ref-states.seed";
import { RefCitiesSeed } from "./ref-cities.seed";
import { RefCurrenciesSeed } from "./ref-currencies.seed";
import { RefLanguagesSeed } from "./ref-languages.seed";
import { EmailTemplatesSeed } from "./email-templates.seed";
import { FuelTypesSeed } from "./fuel-types.seed";
import { MaintenanceTypesSeed } from "./maintenance-types.seed";
import { VehicleBrandsSeed } from "./vehicle-brands.seed";
import { VehicleTypesSeed } from "./vehicle-types.seed";
import { ProductsSeed } from "./products.seed";
import { CategoriesSeed } from "./categories.seed";
import { OrganizationEntity } from "../entities";
import { SEED_ORG_ID } from "./seed.constants";
import { PageAccessSeed } from './page-access.seed';
import { TaxesDefaultSeed } from './taxes-default.seed';


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
    @InjectRepository(OrganizationEntity)
    private readonly orgRepo: Repository<OrganizationEntity>,
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
    private readonly vehicleTypesSeed: VehicleTypesSeed,
    private readonly categoriesSeed: CategoriesSeed,
    private readonly productsSeed: ProductsSeed,
    private readonly pageAccessSeed: PageAccessSeed,
    private readonly taxesDefaultSeed: TaxesDefaultSeed,

    // private readonly demoOrgDataSeed: DemoOrgDataSeed,
  ) {}

  public async runAsync(): Promise<void> {
    this.logger.info("Applying seeds...");
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
    await this.pageAccessSeed.runAsync();
    await this.emailTemplatesSeed.runAsync();
    const org = await this.orgRepo.findOne({ where: { id: SEED_ORG_ID } });
    if (!org) {
      this.logger.warn(`Organization '${SEED_ORG_ID}' not found — skipping categories and products seed`);
    } else {
      await this.categoriesSeed.runAsync();
      await this.productsSeed.runAsync();
    }
    await this.taxesDefaultSeed.runAsync();
    this.logger.info("All seeds applied successfully");
  }
}
