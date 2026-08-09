import { IBaseRepo } from '../db';
import { Filter, PageableFilter } from '../filtering';
import { EmailTemplate } from './domain';

export const EMAIL_TEMPLATE_REPO = 'IEmailTemplateRepo';

export interface IEmailTemplateRepo
  extends IBaseRepo<EmailTemplate, string, PageableFilter<Record<string, unknown>>, Filter<Record<string, unknown>>> {
  findBySlugAsync(slug: string): Promise<EmailTemplate | null>;
}
