import { CustomError } from './Custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  errorType = 'Not-Authorized-Error';

  constructor() {
    super('Not authorized for this action');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [
      {
        errorType: this.errorType,
        message: 'Not authorized for this action',
      },
    ];
    // throw new Error("Not authorized for this action");
  }
}
