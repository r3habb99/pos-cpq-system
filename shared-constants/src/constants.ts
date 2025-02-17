// common-constants/index.ts

export const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const HttpResponseMessages = {
  SUCCESS: "Request processed successfully",
  CREATED: "Resource created successfully",
  BAD_REQUEST: "Invalid request",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Access forbidden",
  NOT_FOUND: "Resource not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
};

export const ErrorMessageCodes = {
  INVALID_REQUEST: "INVALID_REQUEST",
  UNAUTHORIZED_ACCESS: "UNAUTHORIZED_ACCESS",
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};
