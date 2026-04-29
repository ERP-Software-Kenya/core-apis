import { ICentrifugalServiceOptions } from "./i-centrifugal-service.options";

export class CentrifugalServiceOptions implements ICentrifugalServiceOptions {
  public secretKey: string;
  public httpApiKey: string;
  public apiUrl: string;

  constructor(secretKey: string, httpApiKey: string, apiUrl: string) {
    this.secretKey = secretKey;
    this.httpApiKey = httpApiKey;
    this.apiUrl = apiUrl;
  }
}
