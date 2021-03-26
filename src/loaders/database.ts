import { PrismaClient } from '@prisma/client';

import logger from './logger';
import { errorMessage } from '../constants';

export const prisma = new PrismaClient();

export default () => {
  try {
    prisma.$connect();
    logger.info('✌️ Database loaded and connected');
    return;
  } catch (error) {
    logger.error(errorMessage.noDatabaseConnection);
  }
};
