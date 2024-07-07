import { HttpStatusCode } from "../constants/http.enum";

export class HttpException extends Error {
  public statusCode: HttpStatusCode;
  public errors: object | null | undefined = null;

  constructor(
    statusCode: HttpStatusCode,
    message: string,
    errors: object | null | undefined = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}
