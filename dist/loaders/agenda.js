"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const Agenda = require('agenda');
const config_1 = __importDefault(require("../config"));
const loaders_1 = require("../loaders");
const logger_1 = __importDefault(require("../loaders/logger"));
const agenda = new Agenda({
    db: {
        address: config_1.default.agendaDb,
        collection: 'Agenda',
        options: { useUnifiedTopology: true },
    },
});
// agenda.on('ready', () => logger.info('✌️ Agenda Loaded'));
agenda.on('error', () => logger_1.default.error('Agenda Error'));
agenda.define(config_1.default.agendaJobs.refundInitAmount, async (job) => {
    const { reference } = job.attrs.data;
    loaders_1.container.transactionService.refundInitAmount(reference);
});
agenda.start();
exports.default = agenda;
//# sourceMappingURL=agenda.js.map