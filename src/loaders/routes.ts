import express from 'express';

import endpoints from '../api/endpoints';
import { home, cardVerify, transferRecipient } from '../api';
// import { masterAuth } from '../middlewares';
import logger from './logger';

export default (app: express.Application) => {
  app.use(endpoints.home, home);
  app.use(endpoints.cardVerfication, cardVerify);
  app.use(endpoints.transferRecipient, transferRecipient);

  logger.info('✌️ Routes Loaded');
};
