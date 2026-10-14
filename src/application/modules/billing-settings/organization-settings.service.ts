import { Inject, Injectable } from '@nestjs/common';
import { ORGANIZATION_SETTING_REPO } from '../../constants';
import { OrganizationSetting } from './domain';
import {
  IOrganizationSettingRepo,
  UpdateOrganizationSettingInput,
} from './i-organization-setting.repo';
import { formatOrganizationCurrency } from './currency-format';

@Injectable()
export class OrganizationSettingsService {
  public constructor(
    @Inject(ORGANIZATION_SETTING_REPO)
    private readonly repo: IOrganizationSettingRepo,
  ) {}

  public get(organizationId: string): Promise<OrganizationSetting> {
    return this.repo.getOrCreateAsync(organizationId);
  }

  public update(input: UpdateOrganizationSettingInput): Promise<OrganizationSetting> {
    return this.repo.updateSettingsAsync(input);
  }

  public async currencyCode(organizationId: string): Promise<string> {
    return (await this.get(organizationId)).baseCurrencyCode;
  }

  public async formatCurrency(organizationId: string, value: number): Promise<string> {
    return formatOrganizationCurrency(value, await this.currencyCode(organizationId));
  }
}
