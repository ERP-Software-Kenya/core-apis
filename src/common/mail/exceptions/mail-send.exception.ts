export class MailSendException extends Error {
  public readonly cause?: string;

  constructor(cause?: string) {
    super(`Failed to send email${cause ? ': ' + cause : ''}`);
    this.name = MailSendException.name;
    this.cause = cause;
  }
}
