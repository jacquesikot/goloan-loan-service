"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection = (data, offset, per_page) => {
    const response = {
        type: 'collection',
        error: null,
        error_human: null,
        data: data,
        offset: offset,
        per_page: per_page,
    };
    return response;
};
const single = (data) => {
    const response = {
        type: 'single',
        error: null,
        error_human: null,
        data: Object.assign({}, data),
    };
    return response;
};
exports.default = {
    collection,
    single,
};
//# sourceMappingURL=response.js.map