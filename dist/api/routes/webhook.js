"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loaders_1 = require("../../loaders");
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const event = req.body;
    if (event.event === 'charge.success') {
        await loaders_1.container.transactionService.refundInitAmount(event.data.reference);
    }
    res.sendStatus(200);
});
exports.default = router;
//# sourceMappingURL=webhook.js.map