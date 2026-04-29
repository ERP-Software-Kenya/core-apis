// Connection state interfaces
export enum ConnectionState {
  CONNECTING = "connecting",
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  RECONNECTING = "reconnecting",
  ERROR = "error",
}

export enum CentrifugalMethod {
  PUBLISH = "publish",
  SUBSCRIBE = "subscribe",
  UNSUBSCRIBE = "unsubscribe",
  DISCONNECT = "disconnect",
  REFRESH = "refresh",
  HISTORY = "history",
  PRESENCE = "presence",
  PRESENCE_STATS = "presence_stats",
  INFO = "info",
}

export enum CentrifugalErrorCode {
  INVALID_CHANNEL = "INVALID_CHANNEL",
  CHANNEL_TOO_LONG = "CHANNEL_TOO_LONG",
  INVALID_CHANNEL_FORMAT = "INVALID_CHANNEL_FORMAT",
  INVALID_USER_ID = "INVALID_USER_ID",
  INVALID_SESSION_ID = "INVALID_SESSION_ID",
  INVALID_USER_ID_FORMAT = "INVALID_USER_ID_FORMAT",
  USER_ID_TOO_LONG = "USER_ID_TOO_LONG",
  INVALID_ROOM_ID = "INVALID_ROOM_ID",
  INVALID_BROADCAST_NAME = "INVALID_BROADCAST_NAME",
  INVALID_NAMESPACE = "INVALID_NAMESPACE",
  INVALID_IDENTIFIER = "INVALID_IDENTIFIER",
  INVALID_EXPIRY = "INVALID_EXPIRY",
  HTTP_ERROR = "HTTP_ERROR",
  CONNECTION_ERROR = "CONNECTION_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  API_ERROR = "API_ERROR",
  INVALID_BASE64 = "INVALID_BASE64",
}

export enum ChannelNamespace {
  USER = "user",
  ROOM = "room",
  BROADCAST = "broadcast",
  CHAINIT = "chainit",
  NOTIFICATION = "notification",
  SYSTEM = "system",
  SESSION = "session",
  PRIVATE = "private",
  WORKFLOW = "workflow",
  PUBLIC = "public",
}

export enum DisconnectCode {
  DISCONNECT_SHUTDOWN = 3000,
  DISCONNECT_INVALID_TOKEN = 3001,
  DISCONNECT_BAD_REQUEST = 3002,
  DISCONNECT_TOKEN_EXPIRED = 3003,
  DISCONNECT_PERMISSION_DENIED = 3004,
  DISCONNECT_CONNECTION_LIMIT = 3005,
  DISCONNECT_CHANNEL_LIMIT = 3006,
  DISCONNECT_INSUFFICIENT_STATE = 3007,
  DISCONNECT_INVALID_DATA = 3008,
  DISCONNECT_SLOW = 3009,
  DISCONNECT_WRITE_ERROR = 3010,
  DISCONNECT_INAPPROPRIATE_PROTOCOL = 3011,
  DISCONNECT_INTERNAL_ERROR = 3012,
  DISCONNECT_UNSUBSCRIBE_ERROR = 3013,
  DISCONNECT_SUBSCRIBE_ERROR = 3014,
}

export enum LogLevel {
  TRACE = "trace",
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export enum CentrifugalEvent {
  TOKEN_GENERATED = "token:generated",
  MESSAGE_PUBLISHED = "message:published",
  USER_SUBSCRIBED = "user:subscribed",
  USER_UNSUBSCRIBED = "user:unsubscribed",
  USER_DISCONNECTED = "user:disconnected",
  CONNECTION_REFRESHED = "connection:refreshed",
  HEALTH_CHECK_FAILED = "health:check_failed",
  BATCH_PUBLISH_COMPLETED = "batch:publish_completed",
  ERROR_OCCURRED = "error:occurred",
  AUTH_SUCCESS = "auth:success",
  AUTH_ERROR = "auth:error",
  CHECK_IN_PRESENT = "checkin:present",
  AGE_APP_PRESENT = "ageapp:present",
}

export enum MarketPlaceIdentity {
  PRODUCTS = "products",
}

export enum MarketPlaceEvent {
  PRODUCTS_UPDATE = "product:update",
  BID_PLACED_SUCCESS = "bid:placed_success",
  AUTO_BID_ACTIVATED = "auto_bid:activated",
  BIDDER_OUTBID = "bidder:outbid",
  PRODUCT_LISTED = "product:listed",
  PRODUCT_DELISTED = "product:delisted",
  WATCHLIST_BID_UPDATE = "watchlist:bid_update",
  SERVICE_QUOTE_REQUEST = "service:quote_request",
  SERVICE_BOOKING_DETAILS = "service:booking_details",
}
