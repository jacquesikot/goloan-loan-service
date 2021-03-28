import { PrismaClient, Prisma } from '@prisma/client';
import winston from 'winston';
import { Agenda } from 'agenda';

interface IServiceInterface {
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  logger?: winston.Logger;
  agenda?: Agenda;
}

export default IServiceInterface;
