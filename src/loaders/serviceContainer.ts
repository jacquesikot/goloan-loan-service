import logger from './logger';
import { prisma } from './database';
import { cardVerifyService } from '../services';
import { IServiceInterface } from '../interfaces';

const serviceDependencies: IServiceInterface = {
  prisma: prisma,
  logger: logger,
};

const cardVerifyServiceInstance = cardVerifyService(serviceDependencies);

export const container = {
  prisma: prisma,
  logger: logger,
  cardVerifyService: cardVerifyServiceInstance,
};
