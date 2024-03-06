import { validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      next();
    } catch (error: any) {
      res.apiError(
        error.statusCode,
        error.errorType,
        error.message,
        error.errors
      );
      // res.status(400).json({ errors: 'sdjhjh' });
    }
  };
};
