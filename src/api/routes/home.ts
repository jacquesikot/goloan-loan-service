import express from 'express';
import axios from 'axios';

import config from '../../config';
import { container } from '../../loaders/serviceContainer';

const router = express.Router();

router.get('/', async (req, res) => {
  await container.prisma.card_verification.deleteMany({});
  await container.prisma.transfer_recipient.deleteMany({});
  await container.prisma.card_authorization.deleteMany({});
  await container.prisma.loan.deleteMany({});
  await container.prisma.transfer.deleteMany({});

  res.send('deleted');
});

export default router;
