import express from 'express';
import menuRouter from './menu/MenuRouter.js';
import qrRouter from './qr/QrRouter.js';
import stockRouter from './stock/StockRouter.js';
import cors from 'cors';

const apiRouter = express.Router();

apiRouter.use('/menu', cors(), menuRouter);
apiRouter.use('/qr', cors(), qrRouter);
apiRouter.use('/stock', cors(), stockRouter);

export default apiRouter;
