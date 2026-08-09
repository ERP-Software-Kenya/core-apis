export class MailOptions {
  public readonly host: string;
  public readonly port: number;
  public readonly secure: boolean;
  public readonly user: string;
  public readonly password: string;
  public readonly defaultFrom: string;

  constructor(
    host: string,
    port: number,
    secure: boolean,
    user: string,
    password: string,
    defaultFrom: string,
  ) {
    this.host = host;
    this.port = port;
    this.secure = secure;
    this.user = user;
    this.password = password;
    this.defaultFrom = defaultFrom;
  }
}
