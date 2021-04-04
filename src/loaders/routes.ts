import express from 'express';

import endpoints from '../api/endpoints';
import {
  home,
  cardVerify,
  transferRecipient,
  webhook,
  flutterwaveWebhook,
} from '../api';
// import { masterAuth } from '../middlewares';
import logger from './logger';

export default (app: express.Application) => {
  app.use(endpoints.home, home);
  app.use(endpoints.cardVerfication, cardVerify);
  app.use(endpoints.transferRecipient, transferRecipient);
  app.use(endpoints.webhook, webhook);
  app.use(endpoints.flutterwaveWebhook, flutterwaveWebhook);

  logger.info('✌️ Routes Loaded');
};
