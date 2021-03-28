"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("./logger"));
const mongoConnect = mongoose_1.default
    .connect(config_1.default.agendaDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => logger_1.default.info('Agenda Mongo Db connected'))
    .catch((error) => logger_1.default.error(error));
exports.default = mongoConnect;
//# sourceMappingURL=mongoDb.js.map