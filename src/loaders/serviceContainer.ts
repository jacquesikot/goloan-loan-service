import logger from './logger';
import { prisma } from './database';
import { userService } from '../services';
import { IUserService } from '../interfaces';

const userServiceDepenedencies: IUserService = {
  prisma,
  logger,
};

const userServiceInstance = userService(userServiceDepenedencies);

export const container = {
  prisma: prisma,
  logger: logger,
  userService: userServiceInstance,
};
