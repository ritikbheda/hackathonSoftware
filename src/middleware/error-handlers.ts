import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/Custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('we got here too');

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error('it is', err);
  res.status(400).send({
    errors: [{ message: err.message }],
  });
};
