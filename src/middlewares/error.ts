/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
require('express-async-errors');
import { Request, Response, NextFunction } from 'express';

import { logger } from '../loaders';
import { errorEnvelope, errorMessage } from '../constants';

export default (error: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(error);
  res.status(500);
  res.json(errorEnvelope.genericError(errorMessage.internalServerError, 500));
  return;
};
