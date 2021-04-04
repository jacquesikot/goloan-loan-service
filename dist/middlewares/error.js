"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
require('express-async-errors');
const constants_1 = require("../constants");
exports.default = (error, _req, res, _next) => {
    console.log(error);
    res.status(500);
    res.json(constants_1.errorEnvelope.genericError(constants_1.errorMessage.internalServerError, 500));
    return;
};
//# sourceMappingURL=error.js.map