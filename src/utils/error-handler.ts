export class ApplicationError extends Error {
  public code?: string;
  public statusCode?: number;
  public details?: unknown;

  constructor(
    message: string,
    code?: string,
    statusCode?: number,
    details?: unknown,
  ) {
    super(message);
    this.name = "ApplicationError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, details?: unknown) {
    super(message, "VALIDATION_ERROR", 400, details);
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends ApplicationError {
  constructor(message: string = "Authentication required") {
    super(message, "AUTHENTICATION_ERROR", 401);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends ApplicationError {
  constructor(message: string = "Access denied") {
    super(message, "AUTHORIZATION_ERROR", 403);
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string = "The requested resource was not found") {
    super(message, "NOT_FOUND_ERROR", 404);
    this.name = "NotFoundError";
  }
}
