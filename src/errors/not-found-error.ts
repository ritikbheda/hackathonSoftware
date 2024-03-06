import { CustomError } from './Custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;
  errorType = 'Not-Found';
  constructor() {
    super('page not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        errorType: this.errorType,
        message: 'Page not Found',
      },
    ];
  }
}
