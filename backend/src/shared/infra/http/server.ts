import 'reflect-metadata';
import 'dotenv/config.js';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import 'express-async-errors';
import '@shared/container';
import '@shared/infra/http/database';

import routes from '@shared/infra/http/routes/index';
import rateLimiter from '@shared/infra/http/middleware/RateLimit';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());

app.use(rateLimiter);

app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadFolder));

app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server ERROR',
  });
});

app.listen(3333);
