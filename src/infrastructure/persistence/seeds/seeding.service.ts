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
import { OrganizationEntity, UserEntity, RoleEntity, UserRoleEntity, OrgMemberEntity, ERole } from "../entities";
import { SEED_ORG_ID } from "./seed.constants";
import { PageAccessSeed } from './page-access.seed';

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
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepo: Repository<UserRoleEntity>,
    @InjectRepository(OrgMemberEntity)
    private readonly orgMemberRepo: Repository<OrgMemberEntity>,
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
    private readonly pageAccessSeed: PageAccessSeed
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

    let org = await this.orgRepo.findOne({ where: { id: SEED_ORG_ID } });
    if (!org) {
      org = this.orgRepo.create({
        id: SEED_ORG_ID,
        name: 'Pramukh Digital',
        slug: 'pramukh-digital',
        isActive: true,
      });
      await this.orgRepo.save(org);
      this.logger.info(`Organization '${SEED_ORG_ID}' (Pramukh Digital) created`);
    }

    const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@pramukhdigital.com';
    let admin = await this.userRepo.findOne({ where: { email: adminEmail } });
    if (!admin) {
      const superAdminRole = await this.roleRepo.findOne({ where: { name: ERole.SuperAdmin } });
      const orgAdminRole = await this.roleRepo.findOne({ where: { name: ERole.OrgAdmin } });

      admin = this.userRepo.create({
        id: '00000000-0000-4000-8000-000000000002',
        organizationId: org.id,
        firstName: 'Super',
        lastName: 'Admin',
        email: adminEmail,
        clerkUserId: 'user_dev_super_admin',
        isActive: true,
      });
      await this.userRepo.save(admin);

      if (superAdminRole) {
        await this.userRoleRepo.save(
          this.userRoleRepo.create({
            userId: admin.id,
            roleId: superAdminRole.id,
          }),
        );
      }

      if (orgAdminRole) {
        await this.orgMemberRepo.save(
          this.orgMemberRepo.create({
            userId: admin.id,
            organizationId: org.id,
            roleId: orgAdminRole.id,
            status: 'active',
          }),
        );
      }
      this.logger.info(`Default SuperAdmin user created: ${adminEmail}`);
    }

    await this.categoriesSeed.runAsync();
    await this.productsSeed.runAsync();
    this.logger.info("All seeds applied successfully");
  }
}
