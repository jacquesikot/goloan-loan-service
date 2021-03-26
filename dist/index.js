"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('express-async-errors');
const express_1 = __importDefault(require("express"));
const loaders_1 = require("./loaders");
const config_1 = __importDefault(require("./config"));
const middlewares_1 = require("./middlewares");
const app = express_1.default();
require('./loaders/database').default();
require('./loaders/express').default(app);
require('./loaders/routes').default(app);
app.use(middlewares_1.error);
process.on('unhandledRejection', (ex) => {
    throw ex;
});
const PORT = process.env.PORT || config_1.default.port;
const server = app.listen(PORT, () => loaders_1.logger.info(`🛡️  User Service listening on port: ${PORT} 🛡️`));
exports.default = server;
//# sourceMappingURL=index.js.map