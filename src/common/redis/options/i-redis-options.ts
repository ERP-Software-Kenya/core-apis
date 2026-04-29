export interface IRedisOptions {
  username: string;
  host: string;
  port: number;
  password: string;
  transport: string;

  /**
   * Connection name to display in Redis dashboard.
   */
  connectionName?: string;

  maxReconnectionAttempts: number;
  reconnectionDelayInMilliseconds: number;
}
