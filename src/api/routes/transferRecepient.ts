import express from 'express';

import { container } from '../../loaders';
import { responseEnvelope, errorEnvelope, errorMessage } from '../../constants';
import { transferRecepientValidation } from '../../validation';
import { userFunctions } from '../../utils';

const router = express.Router();

const { transferRecepientService } = container;

router.get('/', async (_req, res) => {
  const response = await transferRecepientService.getTransferRecepients();
  res.send(responseEnvelope.collection(response));
});

router.post('/', async (req, res) => {
  const validation = transferRecepientValidation(req.body);
  if (validation.error)
    return res.status(400).send(errorEnvelope.invalidRequest(validation.error));

  const user = await userFunctions.getUser(req.body.user_id);
  if (!user)
    return res
      .status(400)
      .send(errorEnvelope.genericError(errorMessage.userDoesNotExist, 400));

  const recepient = await transferRecepientService.checkTransferRecepient(
    req.body.user_id,
  );
  if (recepient)
    return res
      .status(400)
      .send(
        errorEnvelope.genericError(errorMessage.transferRecepientExists, 400),
      );

  const account = await transferRecepientService.verifyAccountNumber(req.body);
  if (!account)
    return res
      .status(400)
      .send(errorEnvelope.genericError(errorMessage.wrongAccountDetails, 400));

  const response = await transferRecepientService.addTransferRecepient(
    req.body,
  );

  res.status(201).send(responseEnvelope.single(response));
});

export default router;
