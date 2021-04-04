"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = require("../../validation");
const constants_1 = require("../../constants");
const loaders_1 = require("../../loaders");
const utils_1 = require("../../utils");
const { cardVerifyService, transferRecepientService } = loaders_1.container;
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const validation = validation_1.cardInitValidation(req.body);
    if (validation.error)
        return res.status(400).send(constants_1.errorEnvelope.invalidRequest(validation.error));
    const user = await utils_1.userFunctions.getUser(req.body.user_id);
    if (!user)
        return res
            .status(400)
            .send(constants_1.errorEnvelope.genericError(constants_1.errorMessage.userDoesNotExist, 400));
    const hasTransferRecepient = await transferRecepientService.checkTransferRecepient(req.body.user_id);
    if (!hasTransferRecepient)
        return res
            .status(400)
            .send(constants_1.errorEnvelope.genericError(constants_1.errorMessage.noTransferRecepient, 400));
    const authUrl = await cardVerifyService.initiateCardVerification(req.body.user_id);
    if (!authUrl)
        return res
            .status(500)
            .send(constants_1.errorEnvelope.genericError(constants_1.errorMessage.internalServerError, 500));
    res.send(constants_1.responseEnvelope.single(authUrl));
});
router.get('/', async (_req, res) => {
    const verifications = await loaders_1.container.cardVerifyService.getVerifications();
    res.send(constants_1.responseEnvelope.collection(verifications));
});
exports.default = router;
//# sourceMappingURL=cardVerify.js.map