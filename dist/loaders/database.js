"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("./logger"));
const constants_1 = require("../constants");
exports.prisma = new client_1.PrismaClient();
exports.default = () => {
    try {
        exports.prisma.$connect();
        logger_1.default.info('✌️ Database loaded and connected');
        return;
    }
    catch (error) {
        logger_1.default.error(constants_1.errorMessage.noDatabaseConnection);
    }
};
//# sourceMappingURL=database.js.map