import stockService from "../../service/stock/StockService.js";
import errors from "../../models/core/errors.js";

const getStock = (req) => {
  const { id } = req.params;
  return stockService.getStock(id);
};

const getStocks = (req) => {
  let pageNum = req.query.page; // 요청 페이지 넘버
  let offset = 0;

  if (!pageNum) {
    throw new errors.InvalidInputError("pageNum must not be null");
  }

  if (pageNum > 1) {
    offset = 10 * (pageNum - 1);
  }

  const list = stockService.getStocks(offset);
  if (!list || list.length === 0) {
    throw new errors.InvalidInputError("contents is not exist");
  }
  return list;
};

const getStockByBarcode = (req) => {
  const { barcode } = req.params;
  return stockService.getStockByBarcode(barcode);
};

const insertStocks = (req) => {
  const stocks = req.body;

  if (!stocks) {
    throw new errors.InvalidInputError("contents is not exist");
  }

  return Array.isArray(stocks)
    ? (() => {
        stocks.forEach((s) => {
          if (s.amount === null || typeof s.amount === "undefined") {
            throw new errors.InvalidInputError(
              "amount is must not be null or blank"
            );
          }
          if (!s.name) {
            throw new errors.InvalidInputError(
              "name is must not be null or blank"
            );
          }
          if (!s.barcode) {
            throw new errors.InvalidInputError(
              "barcode is must not be null or blank"
            );
          }
        });

        return stockService.insertStocks(stocks);
      })()
    : (() => {
        if (stocks.amount === null || typeof stocks.amount === "undefined") {
          throw new errors.InvalidInputError(
            "amount is must not be null or blank"
          );
        }
        if (!stocks.name) {
          throw new errors.InvalidInputError(
            "name is must not be null or blank"
          );
        }
        if (!stocks.barcode) {
          throw new errors.InvalidInputError(
            "barcode is must not be null or blank"
          );
        }
        return stockService.insertStocks(stocks);
      })();
};

const deleteStocks = (req) => {
  const stocks = req.body;
  if (!stocks || stocks.length === 0) {
    throw new errors.InvalidInputError("contents is not exist");
  }
  return stockService.deleteStocks(stocks);
};

const updateStocks = (req) => {
  const stocks = req.body;
  if (!stocks) {
    throw new errors.InvalidInputError("contents is not exist");
  }
  if (!stocks.id) {
    throw new errors.InvalidInputError("id is must not be null or blank");
  }
  if (!stocks.name) {
    throw new errors.InvalidInputError("name is must not be null or blank");
  }
  if (!stocks.barcode) {
    throw new errors.InvalidInputError("barcode is must not be null or blank");
  }
  if (stocks.amount === null || typeof stocks.amount === "undefined") {
    throw new errors.InvalidInputError("amount is must not be null or blank");
  }
  return stockService.updateStocks(stocks);
};

const getKey = () => {
  return stockService.getKey();
};

export default {
  getKey,
  getStock,
  getStocks,
  getStockByBarcode,
  insertStocks,
  deleteStocks,
  updateStocks,
};
