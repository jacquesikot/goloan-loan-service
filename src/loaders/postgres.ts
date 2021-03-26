import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';
const prisma = new PrismaClient();

export default async () => {
    try {
        const connection = await prisma.$connect();
        return connection;
    } catch (error) {
        logger.error('Postgres loading Error');
    }
};
