import { CustomError } from './Custom-error';

export class InternalServerError extends CustomError {
  statusCode = 500;
  errorType = 'Internal-Server-Error';

  constructor(public message: string) {
    super(message || 'Internal-Server-Error');

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [
      {
        errorType: this.errorType,
        message: this.message,
      },
    ];
  }
}
