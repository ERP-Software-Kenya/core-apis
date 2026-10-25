import { EActivityAction } from '../../../infrastructure/persistence/entities/activity-log.entity';
import { NotificationSetting } from './domain';

export const NOTIFICATION_SETTING_REPO = 'NOTIFICATION_SETTING_REPO';

export interface INotificationSettingRepo {
  findByOrgAsync(organizationId: string): Promise<NotificationSetting[]>;
  findOneAsync(organizationId: string, event: EActivityAction): Promise<NotificationSetting | null>;
  upsertAsync(organizationId: string, event: EActivityAction, isEnabled: boolean): Promise<NotificationSetting>;
  upsertManyAsync(organizationId: string, items: { event: EActivityAction; isEnabled: boolean }[]): Promise<NotificationSetting[]>;
  findOrgAdminEmailsAsync(organizationId: string): Promise<string[]>;
}
