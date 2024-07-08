const responseCodes = {
  UNKNOWN_ERROR: 500,
  // Predefined 2xx HTTP codes
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  // Predefined 3xx HTTP codes
  NOT_MODIFIED: 304,
  // Predefined 4xx HTTP codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  RESOURCE_NOT_FOUND: 404,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  // Predefined 5xx HTTP codes
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
}

export const httpStatusCodes = [
  // Informational
  100, 101, 102, 103, 104,

  // Successful
  200, 201, 202, 203, 204, 205, 206, 207, 208, 226,

  // Redirection
  300, 301, 302, 303, 304, 305, 306, 307, 308, 309,

  // Client Errors
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414,
  415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 428, 429, 431,
  451,

  // Server Errors
  500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511,
]

export default responseCodes
