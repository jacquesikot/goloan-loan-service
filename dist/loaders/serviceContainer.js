"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const logger_1 = __importDefault(require("./logger"));
const database_1 = require("./database");
const services_1 = require("../services");
const userServiceDepenedencies = {
    prisma: database_1.prisma,
    logger: logger_1.default,
};
const userServiceInstance = services_1.userService(userServiceDepenedencies);
exports.container = {
    prisma: database_1.prisma,
    logger: logger_1.default,
    userService: userServiceInstance,
};
//# sourceMappingURL=serviceContainer.js.map