/* eslint-disable @typescript-eslint/no-var-requires */
const Agenda = require('agenda');

import config from '../config';
import { refundInitAmount } from '../jobs';
import logger from '../loaders/logger';

export default () => {
  const agenda = new Agenda({
    db: {
      address: config.agendaDb,
      collection: 'Agenda',
      options: { useUnifiedTopology: true },
    },
  });

  agenda.on('ready', () => logger.info('✌️ Agenda Loaded'));
  agenda.on('error', () => logger.error('Agenda Error'));

  agenda.define(config.agendaJobs.refundInitAmount, async (job) => {
    const { user_id } = job.attrs.data;
    refundInitAmount(user_id);
  });

  agenda.start();
};
