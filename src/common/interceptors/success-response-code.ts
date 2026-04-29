export const SuccessStatusCodes = {
  200: "Ok",
  201: "Created",
  202: "Accepted",
  204: "NoContent",
  207: "MultiStatus",
};

export const DEFAULT_SUCCESS_MESSAGE = "Request successful";

export const SuccessResponseCodes = {
  Ok: {
    name: "Ok",
    status: 200,
    message: "Request was successful.",
    details: {
      hint: "Standard response for successful GET, PUT, PATCH, or DELETE requests.",
    },
    code: "OK",
  },
  Created: {
    name: "Created",
    status: 201,
    message: "Resource was successfully created.",
    details: {
      hint: "Used for POST requests when a new entity is created.",
    },
    code: "CREATED",
  },
  Accepted: {
    name: "Accepted",
    status: 202,
    message: "Request was received but is still being processed.",
    details: {
      hint: "Used for asynchronous operations where processing happens later.",
    },
    code: "ACCEPTED",
  },
  NoContent: {
    name: "No Content",
    status: 204,
    message: "Request was successful, but there’s no response body.",
    details: {
      hint: "Used when an action is completed, but no further data is needed (e.g., DELETE).",
    },
    code: "NO_CONTENT",
  },
  MultiStatus: {
    name: "Multi-Status",
    status: 207,
    message: "The response contains multiple status codes for different operations.",
    details: {
      hint: "Used in batch operations.",
    },
    code: "MULTI_STATUS",
  },
};
