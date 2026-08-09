export class PushNotificationPayload {
  public userId: string;
  public organizationId: string;
  public type: string;
  public title: string;
  public body: string;
  public data?: Record<string, unknown>;
}
