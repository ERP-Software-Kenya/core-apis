import { AutoMap } from "@automapper/classes";
import { CommandBase } from "src/common";

export class OnboardOrganizationCommand extends CommandBase {
  @AutoMap() public clerkUserId: string;
  @AutoMap() public dbUserId: string;
  @AutoMap() public name: string;
  @AutoMap() public slug?: string;
  @AutoMap() public clerkOrgId?: string;
  @AutoMap() public logoUrl?: string;
  @AutoMap() public country?: string;
  @AutoMap() public industry?: string;
  @AutoMap() public businessType?: string;
  @AutoMap() public teamSize?: string;
  @AutoMap(() => [String]) public modules?: string[];
  @AutoMap() public salesMethod?: string;
  @AutoMap() public taxId?: string;
  @AutoMap() public baseCurrencyCode?: string;
  @AutoMap() public timeZone?: string;
  @AutoMap() public fiscalYearStartMonth?: number;
}
