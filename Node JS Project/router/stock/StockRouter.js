import express from "express";

import stockController from "../../controller/stock/StockController.js";

import wrapper from "../../util/wrapper.js";

const stockRouter = express.Router();
stockRouter.get("/key", wrapper.asyncWrapper(stockController.getKey));
stockRouter.get("/:id", wrapper.asyncWrapper(stockController.getStock));
stockRouter.get("/", wrapper.asyncWrapper(stockController.getStocks));
stockRouter.get(
  "/barcode/:barcode",
  wrapper.asyncWrapper(stockController.getStockByBarcode)
);
stockRouter.post("/", wrapper.asyncWrapper(stockController.insertStocks));
stockRouter.delete("/", wrapper.asyncWrapper(stockController.deleteStocks));
stockRouter.put("/", wrapper.asyncWrapper(stockController.updateStocks));

export default stockRouter;
