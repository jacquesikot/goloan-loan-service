/* eslint-disable @typescript-eslint/no-var-requires */
require('express-async-errors');
import express from 'express';

import { logger } from './loaders';
import config from './config';
import { error } from './middlewares';

const app = express();

require('./loaders/database').default();
require('./loaders/express').default(app);
require('./loaders/routes').default(app);

app.use(error);
process.on('unhandledRejection', (ex) => {
  throw ex;
});

const PORT = process.env.PORT || config.port;

const server = app.listen(PORT, () => logger.info(`🛡️  User Service listening on port: ${PORT} 🛡️`));

export default server;
