"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('express-async-errors');
const loaders_1 = require("../loaders");
const constants_1 = require("../constants");
exports.default = (error, _req, res, _next) => {
    loaders_1.logger.error(error);
    res.status(500);
    res.json(constants_1.errorEnvelope.genericError(constants_1.errorMessage.internalServerError, 500));
    return;
};
//# sourceMappingURL=error.js.map