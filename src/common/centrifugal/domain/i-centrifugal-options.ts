export interface ValidateChannelOptions {
  allowWildcard?: boolean;
  maxLength?: number;
  customRegex?: RegExp;
}

export interface ValidateUserIdOptions {
  requireUUID?: boolean;
  maxLength?: number;
  allowEmpty?: boolean;
}

export interface TokenOptions {
  expiresIn?: number;
  channels?: string[];
  info?: Record<string, unknown>;
  b64info?: string;
}

export interface PublishOptions {
  skipHistory?: boolean;
  tags?: Record<string, string>;
  b64data?: string;
  idempotency_key?: string;
  delta?: boolean;
}
