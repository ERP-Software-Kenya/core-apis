export interface IDbOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  sslCert?: string;
  sslEnable?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
  toRetry?: (err: unknown) => boolean;
}
