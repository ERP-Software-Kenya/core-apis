export class PushNotificationException extends Error {
  constructor(cause?: string) {
    super(`Push notification failed${cause ? ': ' + cause : ''}`);
    this.name = PushNotificationException.name;
  }
}
