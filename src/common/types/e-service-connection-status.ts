export enum EServiceConnectionStatus {
  /**
   * The service is connected. It does not mean that the service is ready to process requests.
   */
  Connected = "CONNECTED",

  /**
   * The service is disconnected
   */
  Disconnected = "DISCONNECTED",

  /**
   * The service is ready to process requests
   */
  Ready = "READY",

  /**
   * The service is reconnecting
   */
  Reconnecting = "RECONNECTING",
}
