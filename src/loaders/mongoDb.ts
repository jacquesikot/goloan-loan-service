import mongoose from 'mongoose';

import config from '../config';
import logger from './logger';

const mongoConnect = mongoose
  .connect(config.agendaDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => logger.info('Agenda Mongo Db connected'))
  .catch((error) => logger.error(error));

export default mongoConnect;
