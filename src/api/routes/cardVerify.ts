import express from 'express';

import { cardInitValidation } from '../../validation';
import { errorEnvelope, errorMessage, responseEnvelope } from '../../constants';
import { container } from '../../loaders';

const router = express.Router();

router.post('/', async (req, res) => {
  const validation = cardInitValidation(req.body);
  if (validation.error)
    return res.status(400).send(errorEnvelope.invalidRequest(validation.error));

  const authUrl = await container.cardVerifyService.initiateCardVerification(
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
