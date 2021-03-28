"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("./logger"));
const prisma = new client_1.PrismaClient();
exports.default = async () => {
    try {
        const connection = await prisma.$connect();
        return connection;
    }
    catch (error) {
        logger_1.default.error('Postgres loading Error');
    }
};
//# sourceMappingURL=postgres.js.map