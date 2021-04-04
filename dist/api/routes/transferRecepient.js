"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loaders_1 = require("../../loaders");
const constants_1 = require("../../constants");
const validation_1 = require("../../validation");
const utils_1 = require("../../utils");
const router = express_1.default.Router();
const { transferRecepientService } = loaders_1.container;
router.get('/', async (_req, res) => {
    const response = await transferRecepientService.getTransferRecepients();
    res.send(constants_1.responseEnvelope.collection(response));
});
router.post('/', async (req, res) => {
    const validation = validation_1.transferRecepientValidation(req.body);
    if (validation.error)
        return res.status(400).send(constants_1.errorEnvelope.invalidRequest(validation.error));
    const user = await utils_1.userFunctions.getUser(req.body.user_id);
    if (!user)
        return res
            .status(400)
            .send(constants_1.errorEnvelope.genericError(constants_1.errorMessage.userDoesNotExist, 400));
    const recepient = await transferRecepientService.checkTransferRecepient(req.body.user_id);
    if (recepient)
        return res
            .status(400)
            .send(constants_1.errorEnvelope.genericError(constants_1.errorMessage.transferRecepientExists, 400));
    const account = await transferRecepientService.verifyAccountNumber(req.body);
    if (!account)
        return res
            .status(400)
            .send(constants_1.errorEnvelope.genericError(constants_1.errorMessage.wrongAccountDetails, 400));
    const response = await transferRecepientService.addTransferRecepient(req.body);
    res.status(201).send(constants_1.responseEnvelope.single(response));
});
exports.default = router;
//# sourceMappingURL=transferRecepient.js.map