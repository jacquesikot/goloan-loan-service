"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorEnvelope = exports.errorMessage = void 0;
const errorMessage = {
    noDatabaseConnection: 'Could not connect to the database',
    internalServerError: 'Oops, something went wrong. Internal Server Error',
};
exports.errorMessage = errorMessage;
const errorEnvelope = {
    invalidRequest: (error) => {
        return {
            message: error[0].message,
            field: error[0].context.label,
            type: error[0].type,
        };
    },
    genericError: (message, code) => {
        return {
            message,
            code,
        };
    },
};
exports.errorEnvelope = errorEnvelope;
//# sourceMappingURL=errors.js.map