import express from 'express';

import { cardInitValidation } from '../../validation';
import { errorEnvelope, errorMessage, responseEnvelope } from '../../constants';
import { container } from '../../loaders';
import { userFunctions } from '../../utils';

const { cardVerifyService, transferRecepientService } = container;

const router = express.Router();

router.post('/', async (req, res) => {
  const validation = cardInitValidation(req.body);
  if (validation.error)
    return res.status(400).send(errorEnvelope.invalidRequest(validation.error));

  const user = await userFunctions.getUser(req.body.user_id);
  if (!user)
    return res
      .status(400)
      .send(errorEnvelope.genericError(errorMessage.userDoesNotExist, 400));

  const hasTransferRecepient = await transferRecepientService.checkTransferRecepient(
    req.body.user_id,
  );

  if (!hasTransferRecepient)
    return res
      .status(400)
      .send(errorEnvelope.genericError(errorMessage.noTransferRecepient, 400));

  const authUrl = await cardVerifyService.initiateCardVerification(
    req.body.user_id,
  );

  if (!authUrl)
    return res
      .status(500)
      .send(errorEnvelope.genericError(errorMessage.internalServerError, 500));

  res.send(responseEnvelope.single(authUrl));
});

router.get('/', async (_req, res) => {
  const verifications = await container.cardVerifyService.getVerifications();
  res.send(responseEnvelope.collection(verifications));
});

export default router;
