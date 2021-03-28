"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loaders_1 = require("../../loaders");
const constants_1 = require("../../constants");
const validation_1 = require("../../validation");
const router = express_1.default.Router();
const { transferRecipientService } = loaders_1.container;
router.get('/', async (_req, res) => {
    const response = await transferRecipientService.getTransferRecipients();
    res.send(constants_1.responseEnvelope.collection(response));
});
router.post('/', async (req, res) => {
    const validation = validation_1.transferRecepientValidation(req.body);
    if (validation.error)
        return res.status(400).send(constants_1.errorEnvelope.invalidRequest(validation.error));
    const response = await transferRecipientService.addTransferRecipient(req.body);
    res.status(201).send(constants_1.responseEnvelope.single(response));
});
exports.default = router;
//# sourceMappingURL=transferRecipient.js.map