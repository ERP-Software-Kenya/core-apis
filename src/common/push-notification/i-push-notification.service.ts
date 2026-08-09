import { PushNotificationPayload } from './domain';

export const PUSH_NOTIFICATION_SERVICE = 'IPushNotificationService';

export interface IPushNotificationService {
  sendAsync(payload: PushNotificationPayload): Promise<void>;
  sendBatchAsync(payloads: PushNotificationPayload[]): Promise<void>;
  broadcastToOrgAsync(
    organizationId: string,
    type: string,
    title: string,
    body: string,
    data?: Record<string, unknown>,
  ): Promise<void>;
}
