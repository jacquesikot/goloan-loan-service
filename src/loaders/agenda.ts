/* eslint-disable @typescript-eslint/no-var-requires */
const Agenda = require('agenda');

import config from '../config';
import { container } from '../loaders';
import logger from '../loaders/logger';

const agenda = new Agenda({
  db: {
    address: config.agendaDb,
    collection: 'Agenda',
    options: { useUnifiedTopology: true },
  },
});

// agenda.on('ready', () => logger.info('✌️ Agenda Loaded'));
agenda.on('error', () => logger.error('Agenda Error'));

agenda.define(config.agendaJobs.refundInitAmount, async (job) => {
  const { reference } = job.attrs.data;
  container.transactionService.refundInitAmount(reference);
});

agenda.start();

export default agenda;
