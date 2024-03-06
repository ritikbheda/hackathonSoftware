import { ValidationError } from 'express-validator';
import { CustomError } from './Custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  errorType = 'Request-Validation-Error';

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { errorType: this.errorType, message: err.msg, field: err };
    });
  }
}
