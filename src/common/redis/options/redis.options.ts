import { IRedisOptions } from "./i-redis-options";

export class RedisOptions implements IRedisOptions {
  public host: string;
  public username: string;
  public password: string;
  public port: number;
  public transport: string;
  public maxReconnectionAttempts: number;
  public reconnectionDelayInMilliseconds: number;
  public connectionName?: string;

  constructor(
    host: string,
    username: string,
    password: string,
    port: number,
    transport: string,
    maxReconnectionAttempts: number,
    reconnectionDelayInMilliseconds: number,
    connectionName?: string,
  ) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = port;
    this.transport = transport;
    this.maxReconnectionAttempts = maxReconnectionAttempts;
    this.reconnectionDelayInMilliseconds = reconnectionDelayInMilliseconds;
    this.connectionName = connectionName;
  }
}
