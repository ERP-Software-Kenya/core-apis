import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  IOrganizationSettingRepo,
  UpdateOrganizationSettingInput,
} from '../../../application/modules/billing-settings/i-organization-setting.repo';
import { OrganizationSetting } from '../../../application/modules/billing-settings/domain';
import {
  AccountEntity,
  AccountingPeriodEntity,
  BlackLedgerAccountEntity,
  BlackLedgerEntryEntity,
  CurrencyEntity,
  JournalEntryEntity,
  OrganizationEntity,
  OrganizationSettingEntity,
} from '../entities';
import {
  DEFAULT_BLACK_LEDGER_ACCOUNTS,
  DEFAULT_OFFICIAL_ACCOUNTS,
  AccountingPeriodStatus,
  fiscalPeriodContaining,
} from '../../../application/modules/accounting';

@Injectable()
export class OrganizationSettingRepo implements IOrganizationSettingRepo {
  public constructor(
    @InjectRepository(OrganizationSettingEntity)
    private readonly settings: Repository<OrganizationSettingEntity>,
  ) {}

  public async getOrCreateAsync(organizationId: string): Promise<OrganizationSetting> {
    const existing = await this.settings.findOneBy({ organizationId });
    if (existing) {
      await this.settings.manager.transaction((manager) => this.ensureAccountingDefaults(manager, existing));
      return { ...existing };
    }
    return this.settings.manager.transaction(async (manager) => {
      const organization = await manager.findOneBy(OrganizationEntity, { id: organizationId });
      if (!organization) throw new NotFoundException(`Organization ${organizationId} not found`);
      await manager
        .createQueryBuilder()
        .insert()
        .into(OrganizationSettingEntity)
        .values({ organizationId, baseCurrencyCode: 'USD', fiscalYearStartMonth: 4, timeZone: 'UTC' })
        .orIgnore()
        .execute();
      const created = await manager.findOneByOrFail(OrganizationSettingEntity, { organizationId });
      await this.ensureAccountingDefaults(manager, created);
      return { ...created };
    });
  }

  public async updateSettingsAsync(input: UpdateOrganizationSettingInput): Promise<OrganizationSetting> {
    const currencyCode = input.baseCurrencyCode.trim().toUpperCase();
    if (!/^[A-Z]{3}$/.test(currencyCode)) {
      throw new BadRequestException('Base currency must be a three-letter ISO currency code');
    }
    if (!Number.isInteger(input.fiscalYearStartMonth) || input.fiscalYearStartMonth < 1 || input.fiscalYearStartMonth > 12) {
      throw new BadRequestException('Fiscal year start month must be between 1 and 12');
    }
    if (!input.timeZone || input.timeZone.length > 100) throw new BadRequestException('A valid time zone is required');
    try {
      new Intl.DateTimeFormat('en-US', { timeZone: input.timeZone }).format();
    } catch {
      throw new BadRequestException('Time zone must be a valid IANA time-zone identifier');
    }

    return this.settings.manager.transaction(async (manager) => {
      const currency = await manager.findOneBy(CurrencyEntity, { code: currencyCode });
      if (!currency) throw new BadRequestException(`Unsupported currency code ${currencyCode}`);
      let setting = await manager.findOne(OrganizationSettingEntity, {
        where: { organizationId: input.organizationId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!setting) {
        const organization = await manager.findOneBy(OrganizationEntity, { id: input.organizationId });
        if (!organization) throw new NotFoundException(`Organization ${input.organizationId} not found`);
        setting = manager.create(OrganizationSettingEntity, { organizationId: input.organizationId });
      }
      const hasOfficialEntries = await manager.existsBy(JournalEntryEntity, {
        organizationId: input.organizationId,
      });
      const hasBlackEntries = await manager.existsBy(BlackLedgerEntryEntity, {
        organizationId: input.organizationId,
      });
      if (
        (hasOfficialEntries || hasBlackEntries) &&
        (setting.baseCurrencyCode !== currencyCode ||
          setting.fiscalYearStartMonth !== input.fiscalYearStartMonth)
      ) {
        throw new ConflictException(
          'Base currency and fiscal year cannot change after official journal entries exist',
        );
      }
      const fiscalYearChanged = setting.fiscalYearStartMonth !== input.fiscalYearStartMonth;
      setting.baseCurrencyCode = currencyCode;
      setting.fiscalYearStartMonth = input.fiscalYearStartMonth;
      setting.timeZone = input.timeZone;
      const saved = await manager.save(setting);
      if (fiscalYearChanged) {
        await manager.delete(AccountingPeriodEntity, { organizationId: input.organizationId });
      }
      await this.ensureAccountingDefaults(manager, saved);
      return { ...saved };
    });
  }

  private async ensureAccountingDefaults(
    manager: EntityManager,
    setting: OrganizationSettingEntity,
  ): Promise<void> {
    await manager
      .createQueryBuilder()
      .insert()
      .into(AccountEntity)
      .values(
        DEFAULT_OFFICIAL_ACCOUNTS.map(([code, name, type]) => ({
          organizationId: setting.organizationId,
          code,
          name,
          type,
          isSystem: true,
          isActive: true,
        })),
      )
      .orIgnore()
      .execute();
    await manager
      .createQueryBuilder()
      .insert()
      .into(BlackLedgerAccountEntity)
      .values(
        DEFAULT_BLACK_LEDGER_ACCOUNTS.map(([code, name, type]) => ({
          organizationId: setting.organizationId,
          code,
          name,
          type,
          isActive: true,
        })),
      )
      .orIgnore()
      .execute();

    const period = fiscalPeriodContaining(new Date(), setting.fiscalYearStartMonth);
    const existingPeriod = await manager.findOneBy(AccountingPeriodEntity, {
      organizationId: setting.organizationId,
      startsOn: period.startsOn,
      endsOn: period.endsOn,
    });
    if (!existingPeriod) {
      await manager.save(
        AccountingPeriodEntity,
        manager.create(AccountingPeriodEntity, {
          organizationId: setting.organizationId,
          ...period,
          status: AccountingPeriodStatus.Open,
        }),
      );
    }
  }
}
