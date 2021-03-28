"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const logger_1 = __importDefault(require("./logger"));
const database_1 = require("./database");
const services_1 = require("../services");
const agenda_1 = __importDefault(require("./agenda"));
const serviceDependencies = {
    prisma: database_1.prisma,
    logger: logger_1.default,
    agenda: agenda_1.default,
};
const cardVerifyServiceInstance = services_1.cardVerifyService(serviceDependencies);
const transferRecipientServiceInstance = services_1.transferRecipientService(serviceDependencies);
exports.container = {
    prisma: database_1.prisma,
    logger: logger_1.default,
    cardVerifyService: cardVerifyServiceInstance,
    transferRecipientService: transferRecipientServiceInstance,
};
//# sourceMappingURL=serviceContainer.js.map