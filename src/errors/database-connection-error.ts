import { CustomError } from './Custom-error';

export class DatabaseConnectionError extends CustomError {
  reason = 'Error connecting to database';
  statusCode = 500;
  errorType = 'Database-Connectione-Error';

  constructor() {
    super('Error connecting to db');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ errorType: this.errorType, message: this.reason }];
  }
}
