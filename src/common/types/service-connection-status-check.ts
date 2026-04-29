import { EServiceConnectionStatus } from "./e-service-connection-status";

export class ServiceConnectionStatusCheck {
  /**
   * The status of the service connection.
   */
  public get status() {
    return this._status;
  }

  /**
   * The reason for the status if it can be provided.
   */
  public get reason() {
    return this._reason;
  }

  private constructor(private _status: EServiceConnectionStatus, private _reason?: string) {}

  public static build(status: EServiceConnectionStatus, reason?: string): ServiceConnectionStatusCheck {
    return new ServiceConnectionStatusCheck(status, reason);
  }

  public static buildReconnecting(): ServiceConnectionStatusCheck {
    return new ServiceConnectionStatusCheck(EServiceConnectionStatus.Reconnecting);
  }

  public static buildConnected(): ServiceConnectionStatusCheck {
    return new ServiceConnectionStatusCheck(EServiceConnectionStatus.Connected);
  }

  public static buildReady(): ServiceConnectionStatusCheck {
    return new ServiceConnectionStatusCheck(EServiceConnectionStatus.Ready);
  }

  public static buildDisconnected(reason: string): ServiceConnectionStatusCheck {
    return new ServiceConnectionStatusCheck(EServiceConnectionStatus.Disconnected, reason);
  }

  public static buildFromException(ex: Error): ServiceConnectionStatusCheck {
    return new ServiceConnectionStatusCheck(EServiceConnectionStatus.Disconnected, ex.message);
  }
}
