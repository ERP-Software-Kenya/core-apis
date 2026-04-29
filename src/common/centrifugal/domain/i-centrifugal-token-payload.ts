export interface CentrifugalTokenPayload {
  id: string;
  info?: Record<string, unknown>;
  channels?: string[];
}

export interface CentrifugalServiceConfig {
  secretKey: string;
  apiUrl: string;
  httpApiKey: string;
  defaultTokenExpiry?: number;
  maxRetries?: number;
  retryDelay?: number;
  maxTokenExpiry?: number;
  maxChannelLength?: number;
  enableDebugLogging?: boolean;
}

// Statistics and monitoring interfaces
export interface CentrifugalStats {
  totalConnections: number;
  totalChannels: number;
  totalMessages: number;
  uptime: number;
  lastHealthCheck: Date;
  errorRate: number;
}

export interface ChannelStats {
  name: string;
  numClients: number;
  numUsers: number;
  lastActivity: Date;
}
export interface CentrifugalError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, unknown>;
}

export interface HistoryPublication {
  offset: number;
  data: unknown;
  info?: Record<string, unknown>;
  tags?: Record<string, string>;
}
