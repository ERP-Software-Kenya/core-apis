export enum ErrorStatusCodes {
  BAD_REQUEST = "BadRequest",
  UNAUTHORIZED = "Unauthorized",
  PAYMENT_REQUIRED = "PaymentRequired",
  FORBIDDEN = "Forbidden",
  NOT_FOUND = "NotFound",
  METHOD_NOT_ALLOWED = "MethodNotAllowed",
  CONFLICT = "Conflict",
  UNSUPPORTED_MEDIA_TYPE = "UnsupportedMediaType",
  UPGRADE_REQUIRED = "UpgradeRequired",
  TOO_MANY_REQUESTS = "TooManyRequests",
  INTERNAL_SERVER_ERROR = "InternalServerError",
  BAD_GATEWAY = "BadGateway",
  SERVICE_UNAVAILABLE = "ServiceUnavailable",
  GATEWAY_TIMEOUT = "GatewayTimeout",
}

export enum ErrorCodes {
  INVALID_INPUT = "INVALID_INPUT",
  INVALID_FILE_TYPE = "INVALID_FILE_TYPE",
  FILE_TOO_LARGE = "FILE_TOO_LARGE",
  MALFORMED_REQUEST = "MALFORMED_REQUEST",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  TOKEN_REVOKED = "TOKEN_REVOKED",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  INVALID_TOKEN = "INVALID_TOKEN",
  UNAUTHORIZED_ACCESS = "UNAUTHORIZED_ACCESS",
  INSUFFICIENT_BALANCE = "INSUFFICIENT_BALANCE",
  PAYMENT_REQUIRED = "PAYMENT_REQUIRED",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  INVOICE_OVERDUE = "INVOICE_OVERDUE",
  INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",
  FORBIDDEN = "FORBIDDEN",
  ORGANIZATION_RESTRICTED = "ORGANIZATION_RESTRICTED",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  FILE_NOT_FOUND = "FILE_NOT_FOUND",
  INVALID_CLIENT_STATE = "INVALID_CLIENT_STATE",
  METHOD_NOT_ALLOWED = "METHOD_NOT_ALLOWED",
  BUSINESS_RULE_VIOLATION = "BUSINESS_RULE_VIOLATION",
  RESOURCE_ALREADY_EXISTS = "RESOURCE_ALREADY_EXISTS",
  UNSUPPORTED_MEDIA_TYPE = "UNSUPPORTED_MEDIA_TYPE",
  INVALID_CONTENT_TYPE = "INVALID_CONTENT_TYPE",
  UNSUPPORTED_FILE_FORMAT = "UNSUPPORTED_FILE_FORMAT",
  API_VERSION_DEPRECATED = "API_VERSION_DEPRECATED",
  API_VERSION_NOT_SUPPORTED = "API_VERSION_NOT_SUPPORTED",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  THROTTLE_LIMIT_REACHED = "THROTTLE_LIMIT_REACHED",
  API_QUOTA_EXCEEDED = "API_QUOTA_EXCEEDED",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  BAD_GATEWAY = "BAD_GATEWAY",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  MAINTENANCE_MODE = "MAINTENANCE_MODE",
  GATEWAY_TIMEOUT = "GATEWAY_TIMEOUT",
  INVALID_ORGANIZATION_STATE = "INVALID_ORGANIZATION_STATE",
}

export const DEFAULT_ERROR_MESSAGE = "Something Went Wrong";

export const ErrorResponseCodes = {
  BadRequest: {
    name: "Bad Request",
    status: 400,
    errorCodes: {
      INVALID_INPUT: {
        message: "The request is malformed or has invalid parameters.",
        details: {
          hint: "Ensure the input fields are valid and properly formatted.",
        },
      },
      INVALID_FILE_TYPE: {
        message: "The file type is not supported.",
        details: {
          hint: "Check the file format and ensure it's supported (e.g., JPG, PNG).",
        },
      },
      FILE_TOO_LARGE: {
        message: "The file exceeds the maximum allowed size.",
        details: {
          hint: "Ensure the file is within the allowed size limit.",
        },
      },
      MALFORMED_REQUEST: {
        message: "The request structure is incorrect.",
        details: {
          hint: "Check the request body format and ensure it follows the required structure.",
        },
      },
    },
  },
  Unauthorized: {
    name: "Unauthorized",
    status: 401,
    errorCodes: {
      TOKEN_EXPIRED: {
        message: "The authentication token has expired.",
        details: {
          hint: "Renew your authentication token and try again.",
        },
      },
      TOKEN_REVOKED: {
        message: "The authentication token has been revoked.",
        details: {
          hint: "Contact support to resolve the issue.",
        },
      },
      INVALID_CREDENTIALS: {
        message: "The provided credentials are invalid.",
        details: {
          hint: "Verify your credentials and try again.",
        },
      },
      INVALID_TOKEN: {
        message: "The authentication token is invalid.",
        details: {
          hint: "Ensure you are sending a valid token in the request.",
        },
      },
      UNAUTHORIZED_ACCESS: {
        message: "The user does not have permission to access this resource.",
        details: {
          hint: "Check your permissions or contact an administrator.",
        },
      },
    },
  },
  PaymentRequired: {
    name: "Payment Required",
    status: 402,
    errorCodes: {
      INSUFFICIENT_BALANCE: {
        message: "You do not have enough balance to complete the request.",
        details: {
          hint: "Top-up your balance to continue.",
        },
      },
      PAYMENT_REQUIRED: {
        message: "Payment is required to access this service.",
        details: {
          hint: "Please complete the payment process.",
        },
      },
      PAYMENT_FAILED: {
        message: "The payment transaction failed.",
        details: {
          hint: "Try again or contact support for assistance.",
        },
      },
      INVOICE_OVERDUE: {
        message: "Your invoice is overdue.",
        details: {
          hint: "Please pay the outstanding invoice to continue.",
        },
      },
    },
  },
  Forbidden: {
    name: "Forbidden",
    status: 403,
    errorCodes: {
      INSUFFICIENT_PERMISSIONS: {
        message: "You do not have sufficient permissions to perform this action.",
        details: {
          hint: "Contact an administrator to request access.",
        },
      },
      FORBIDDEN: {
        message: "Access to the requested resource is forbidden.",
        details: {
          hint: "Ensure you have the correct permissions to access this resource.",
        },
      },
      ORGANIZATION_RESTRICTED: {
        message: "Your organization does not have access to this resource.",
        details: {
          hint: "Check with your organization's administrator for access.",
        },
      },
    },
  },
  NotFound: {
    name: "Not Found",
    status: 404,
    errorCodes: {
      RESOURCE_NOT_FOUND: {
        message: "The requested resource does not exist.",
        details: {
          hint: "Check if the resource ID or URL is correct and exists.",
        },
      },
      FILE_NOT_FOUND: {
        message: "The requested file could not be found.",
        details: {
          hint: "Verify the file ID or path is correct.",
        },
      },
      INVALID_CLIENT_STATE: {
        message: "The client is not in the required state to perform this operation.",
        details: {
          hint: "Please ensure the client is in an valid state before proceeding with this operation.",
        },
      },
      INVALID_ORGANIZATION_STATE: {
        message: "The organization is not in the required state to perform this operation.",
        details: {
          hint: "Please ensure the organization is in an valid state before proceeding with this operation.",
        },
      },
    },
  },
  MethodNotAllowed: {
    name: "Method Not Allowed",
    status: 405,
    errorCodes: {
      METHOD_NOT_ALLOWED: {
        message: "The HTTP method used is not allowed for this endpoint.",
        details: {
          hint: "Ensure you're using the correct HTTP method (GET, POST, PUT, DELETE, etc.) for this endpoint.",
        },
      },
    },
  },
  Conflict: {
    name: "Conflict",
    status: 409,
    errorCodes: {
      BUSINESS_RULE_VIOLATION: {
        message: "There was a conflict due to business rule violation.",
        details: {
          hint: "Review the business rules and ensure no violations occur.",
        },
      },
      RESOURCE_ALREADY_EXISTS: {
        message: "The resource already exists.",
        details: {
          hint: "Check if the resource already exists before trying to create it.",
        },
      },
    },
  },
  UnsupportedMediaType: {
    name: "Unsupported Media Type",
    status: 415,
    errorCodes: {
      UNSUPPORTED_MEDIA_TYPE: {
        message: "The request contains an unsupported media type.",
        details: {
          hint: "Ensure the request Content-Type is valid (e.g., application/json, application/xml).",
        },
      },
      INVALID_CONTENT_TYPE: {
        message: "The content type specified in the request is invalid.",
        details: {
          hint: "Check if the Content-Type header matches the expected format.",
        },
      },
      UNSUPPORTED_FILE_FORMAT: {
        message: "The file format is unsupported.",
        details: {
          hint: "Ensure the file format is one of the allowed types.",
        },
      },
    },
  },
  UpgradeRequired: {
    name: "Upgrade Required",
    status: 426,
    errorCodes: {
      API_VERSION_DEPRECATED: {
        message: "The API version you are using is deprecated.",
        details: {
          hint: "Please upgrade to a newer version of the API.",
        },
      },
      API_VERSION_NOT_SUPPORTED: {
        message: "The API version you are using is not supported.",
        details: {
          hint: "Upgrade to a supported API version to continue.",
        },
      },
    },
  },
  TooManyRequests: {
    name: "Too Many Requests",
    status: 429,
    errorCodes: {
      RATE_LIMIT_EXCEEDED: {
        message: "You have exceeded the allowed number of requests.",
        details: {
          hint: "Please wait for some time before making more requests.",
        },
      },
      THROTTLE_LIMIT_REACHED: {
        message: "The throttling limit has been reached.",
        details: {
          hint: "Try again later or reduce the frequency of your requests.",
        },
      },
      API_QUOTA_EXCEEDED: {
        message: "Your API quota has been exceeded.",
        details: {
          hint: "Upgrade your plan or wait for the quota to reset.",
        },
      },
    },
  },
  InternalServerError: {
    name: "Internal Server Error",
    status: 500,
    keyword: [""],
    errorCodes: {
      INTERNAL_SERVER_ERROR: {
        message: "Something Went Wrong",
        details: {
          hint: "Please try again later. If the issue persists, contact support.",
        },
      },
    },
  },
  BadGateway: {
    name: "Bad Gateway",
    status: 502,
    errorCodes: {
      BAD_GATEWAY: {
        message: "Received an invalid response from an upstream server.",
        details: {
          hint: "Check the upstream service for issues or downtime.",
        },
      },
    },
  },
  ServiceUnavailable: {
    name: "Service Unavailable",
    status: 503,
    errorCodes: {
      SERVICE_UNAVAILABLE: {
        message: "The server is temporarily overloaded or under maintenance.",
        details: {
          hint: "Please try again after some time.",
        },
      },
      MAINTENANCE_MODE: {
        message: "The server is currently in maintenance mode.",
        details: {
          hint: "Please check back later or contact support for more details.",
        },
      },
    },
  },
  GatewayTimeout: {
    name: "Gateway Timeout",
    status: 504,
    errorCodes: {
      GATEWAY_TIMEOUT: {
        message: "The server did not respond in time.",
        details: {
          hint: "Check the network connectivity or the response time of the upstream server.",
        },
      },
    },
  },
};
