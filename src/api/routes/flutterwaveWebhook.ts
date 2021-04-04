import express from 'express';

import { container } from '../../loaders';

const router = express.Router();

router.post('/', async (req, res) => {
  const event = req.body;

  console.log(event);

  if (event.event === 'charge.success') {
    await container.transactionService.refundInitAmount(event.data.reference);
  }

  res.sendStatus(200);
});

export default router;
