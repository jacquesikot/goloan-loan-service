import express from 'express';

import { container } from '../../loaders';
import { responseEnvelope, errorEnvelope } from '../../constants';
import { transferRecepientValidation } from '../../validation';

const router = express.Router();

const { transferRecipientService } = container;

router.get('/', async (_req, res) => {
  const response = await transferRecipientService.getTransferRecipients();
  res.send(responseEnvelope.collection(response));
});

router.post('/', async (req, res) => {
  const validation = transferRecepientValidation(req.body);
  if (validation.error)
    return res.status(400).send(errorEnvelope.invalidRequest(validation.error));

  const response = await transferRecipientService.addTransferRecipient(
    req.body,
  );

  res.status(201).send(responseEnvelope.single(response));
});

export default router;
