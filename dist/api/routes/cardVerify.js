"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = require("../../validation");
const constants_1 = require("../../constants");
const loaders_1 = require("../../loaders");
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const validation = validation_1.cardInitValidation(req.body);
    if (validation.error)
        return res.status(400).send(constants_1.errorEnvelope.invalidRequest(validation.error));
    const authUrl = await loaders_1.container.cardVerifyService.initiateCardVerification(req.body.user_id);
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
// {
//     "type": "single",
//     "error": null,
//     "error_human": null,
//     "data": {
//         "id": "587285a4-7524-4010-9784-a5f7360f7de9",
//         "first_name": "jacques",
//         "last_name": "ikot",
//         "phone_number": "2349033049273",
//         "email": "jacquesikot@gmail.com",
//         "corporate_id": null,
//         "gender": "male",
//         "bvn": "1234567890",
//         "user_type": "1",
//         "created_at": "2021-03-26T19:28:14.007Z",
//         "updated_at": null,
//         "password": "$2b$10$Yb/GaDNaqAEUbwVpMM3.muQcIlQWBJpBl4ibj.0bmP/gSivyfiyzi",
//         "pin": "$2b$10$xY1PqlQxxNlt9VozXPYtxetM4hJG8IREHze/BycobekEarZNCspeS",
//         "last_login": null,
//         "modified": null
//     }
// }
//# sourceMappingURL=cardVerify.js.map