import logger from './logger';
import { prisma } from './database';
import {
  cardVerifyService,
  transferRecepientService,
  transactionService,
} from '../services';
import { IServiceInterface } from '../interfaces';
import agenda from './agenda';

const serviceDependencies: IServiceInterface = {
  prisma: prisma,
  logger: logger,
  agenda: agenda,
};

const cardVerifyServiceInstance = cardVerifyService(serviceDependencies);
const transferRecepientServiceInstance = transferRecepientService(
  serviceDependencies,
);
const transactionServiceInstance = transactionService(serviceDependencies);

export const container = {
  prisma: prisma,
  logger: logger,
  cardVerifyService: cardVerifyServiceInstance,
  transferRecepientService: transferRecepientServiceInstance,
  transactionService: transactionServiceInstance,
};
