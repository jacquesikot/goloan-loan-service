"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loaders_1 = require("../../loaders");
const utils_1 = require("../../utils");
exports.default = (error, _req, res, _next) => {
    loaders_1.logger.error(error);
    res
        .status(500)
        .send(utils_1.errorEnvelope.genericError(utils_1.errorMessage.internalServerError, 500));
};
//# sourceMappingURL=error.js.map