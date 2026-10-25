import { IBaseRepo, Filter } from '../../../common';
import { OrganizationUnit, OrganizationUnitFilter } from './domain';

export interface IOrganizationUnitRepo extends IBaseRepo<OrganizationUnit, string, Filter<OrganizationUnitFilter>, Filter<OrganizationUnitFilter>> {}

export const ORGANIZATION_UNIT_REPO = 'ORGANIZATION_UNIT_REPO';
