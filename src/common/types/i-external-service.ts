import { ServiceConnectionStatusCheck } from "./service-connection-status-check";

export interface IExternalService {
  /**
   * Connect to the service.
   */
  connectAsync(): Promise<void>;

  /**
   * Check if the connection to the service is working.
   * @returns The connection status.
   */
  checkConnectionStatusAsync(): Promise<ServiceConnectionStatusCheck>;
}
