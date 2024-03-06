import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Response {
    apiError: (
      statusCode: number,
      errorMessage: string,
      message: string,
      data?: any
    ) => Response;
    success: (statusCode: number, message: string, data: any) => Response;
  }
}

const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.apiError = (
    statusCode: number,
    errorMessage: string,
    message: string,
    data?: any
  ) =>
    res.status(statusCode).json({
      status: statusCode,
      error: errorMessage,
      message: message,
      data: data || null,
    });
  res.success = (statusCode: number, message: string, data?: any) =>
    res.status(statusCode).json({
      status: statusCode,
      error: null,
      message,
      data,
    });
  return next();
};

export { responseHandler };
