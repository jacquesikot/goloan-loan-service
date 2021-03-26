"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints_1 = __importDefault(require("../api/endpoints"));
const api_1 = require("../api");
// import { masterAuth } from '../middlewares';
const logger_1 = __importDefault(require("./logger"));
exports.default = (app) => {
    app.use(endpoints_1.default.home, api_1.home);
    app.use(endpoints_1.default.cardVerfication, api_1.cardVerify);
    app.use(endpoints_1.default.transferRecipient, api_1.transferRecipient);
    logger_1.default.info('✌️ Routes Loaded');
};
//# sourceMappingURL=routes.js.map