export interface IClerkOptions {
  secretKey: string;
  jwksUrl: string;
  issuer: string;
  audience?: string;
  authorizedParties: string[];
  webhookSecret: string;
}
