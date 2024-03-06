import { CustomError } from './Custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;
  errorType = 'Bad-Request-Error';

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ errorType: this.errorType, message: this.message }];
  }
}
