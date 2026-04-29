import { HistoryPublication } from "./i-centrifugal-token-payload";

export interface CentrifugalResponse<T = unknown> {
  result?: T;
  error?: {
    code: number;
    message: string;
    context?: Record<string, unknown>;
  };
  id?: string;
  timestamp?: Date;
}

// Base response interface
export interface BaseResponse {
  error?: {
    code: number;
    message: string;
  };
}

// Publish response
export interface PublishResponse extends BaseResponse {
  result?: {
    offset?: number;
    epoch?: string;
  };
}

// Subscribe interfaces

export interface SubscribeResponse extends BaseResponse {
  result?: {
    expires?: boolean;
    ttl?: number;
  };
}

export interface UnsubscribeResponse extends BaseResponse {
  result?: Record<string, unknown>;
}

export interface DisconnectResponse extends BaseResponse {
  result?: Record<string, unknown>;
}

export interface RefreshResponse extends BaseResponse {
  result?: {
    expires?: boolean;
    ttl?: number;
  };
}

export interface HistoryResponse extends BaseResponse {
  result?: {
    publications: HistoryPublication[];
    offset: number;
    epoch: string;
  };
}
// Presence interfaces

export interface PresenceInfo {
  client: string;
  user: string;
  conn_info?: Record<string, unknown>;
  chan_info?: Record<string, unknown>;
}

export interface PresenceResponse extends BaseResponse {
  result?: {
    presence: Record<string, PresenceInfo>;
  };
}

// Presence stats interfaces

export interface PresenceStatsResponse extends BaseResponse {
  result?: {
    num_clients: number;
    num_users: number;
  };
}
