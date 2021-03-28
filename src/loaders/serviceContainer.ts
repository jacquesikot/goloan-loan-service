import logger from './logger';
import { prisma } from './database';
import { cardVerifyService, transferRecipientService } from '../services';
import { IServiceInterface } from '../interfaces';
import agenda from './agenda';

const serviceDependencies: IServiceInterface = {
  prisma: prisma,
  logger: logger,
  agenda: agenda,
};

const cardVerifyServiceInstance = cardVerifyService(serviceDependencies);
const transferRecipientServiceInstance = transferRecipientService(
  serviceDependencies,
);

export const container = {
  prisma: prisma,
  logger: logger,
  cardVerifyService: cardVerifyServiceInstance,
  transferRecipientService: transferRecipientServiceInstance,
};
