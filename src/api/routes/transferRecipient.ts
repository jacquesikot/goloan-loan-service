import express from 'express';

const router = express.Router();

router.get('/', async (_req, res) => {
  res.send('transfer_recipient');
});

export default router;
