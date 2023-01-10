import express from 'express';

import qrController from '../../controller/qr/QrController.js';

import wrapper from '../../util/wrapper.js';

const qrRouter = express.Router();

qrRouter.get('/:uuid', wrapper.asyncWrapper(qrController.getQr));

export default qrRouter;
