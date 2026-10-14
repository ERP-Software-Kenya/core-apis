import { OrganizationSetting } from './domain';

export interface UpdateOrganizationSettingInput {
  organizationId: string;
  baseCurrencyCode: string;
  fiscalYearStartMonth: number;
  timeZone: string;
}

export interface IOrganizationSettingRepo {
  getOrCreateAsync(organizationId: string): Promise<OrganizationSetting>;
  updateSettingsAsync(input: UpdateOrganizationSettingInput): Promise<OrganizationSetting>;
}
