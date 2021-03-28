"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const Agenda = require('agenda');
const config_1 = __importDefault(require("../config"));
const jobs_1 = require("../jobs");
const logger_1 = __importDefault(require("../loaders/logger"));
exports.default = () => {
    const agenda = new Agenda({
        db: {
            address: config_1.default.agendaDb,
            collection: 'Agenda',
            options: { useUnifiedTopology: true },
        },
    });
    agenda.on('ready', () => logger_1.default.info('✌️ Agenda Loaded'));
    agenda.on('error', () => logger_1.default.error('Agenda Error'));
    agenda.define(config_1.default.agendaJobs.refundInitAmount, async (job) => {
        const { user_id } = job.attrs.data;
        jobs_1.refundInitAmount(user_id);
    });
    agenda.start();
};
//# sourceMappingURL=agenda.js.map