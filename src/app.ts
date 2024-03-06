import express from 'express';
import { json } from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { authUserRouter } from './routes/authUser.routes';
// import { errorHandler } from './middleware/error-handlers';
import { BadRequestError } from './errors/bad-request-error';
import { responseHandler } from './middleware/responseMiddleware';
import cookieParser from 'cookie-parser';
const app = express();
app.set('trust proxy', true);
app.use(json());

const allowedOrigins = ['http://localhost:3000'];

const corsOptions: CorsOptions = {
  origin: function (origin: any, callback: any) {
    // Check if the request origin is in the allowed origins list
    if (allowedOrigins.includes(origin || '') || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(responseHandler);
app.use(cookieParser());
// app.use(errorHandler);
app.use('/', authUserRouter);

app.all('*', async (req: any, res: any) => {
  try {
    throw new BadRequestError('this is not allowedjhkjk');
  } catch (err: any) {
    res.apiError(err.statusCode, err.errorType, err.message);
  }
});

export { app };
