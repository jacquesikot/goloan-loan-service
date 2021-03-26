import { PrismaClient, Prisma } from '@prisma/client';
import winston from 'winston';

interface IUserService {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  logger: winston.Logger;
}

export default IUserService;
