"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('express-async-errors');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = __importDefault(require("./logger"));
exports.default = (app) => {
    app.use(cors_1.default());
    app.use(helmet_1.default());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    if (app.get('env') === 'development') {
        app.use(morgan_1.default('tiny'));
        logger_1.default.info('✌️ Morgan enabled');
    }
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=express.js.map