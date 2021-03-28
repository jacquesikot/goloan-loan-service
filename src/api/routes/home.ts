import express from 'express';

import { container } from '../../loaders/serviceContainer';

const router = express.Router();

router.get('/', async (_req, res) => {
  await container.prisma.card_verification.deleteMany({});
  await container.prisma.transfer_recipient.deleteMany({});

  res.send('deleted');
});

export default router;
