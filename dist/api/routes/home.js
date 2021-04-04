"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serviceContainer_1 = require("../../loaders/serviceContainer");
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    await serviceContainer_1.container.prisma.card_verification.deleteMany({});
    await serviceContainer_1.container.prisma.transfer_recipient.deleteMany({});
    await serviceContainer_1.container.prisma.card_authorization.deleteMany({});
    await serviceContainer_1.container.prisma.loan.deleteMany({});
    await serviceContainer_1.container.prisma.transfer.deleteMany({});
    res.send('deleted');
});
exports.default = router;
//# sourceMappingURL=home.js.map