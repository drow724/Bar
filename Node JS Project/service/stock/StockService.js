import Stock from "../../entity/Stock.js";

const getStock = async (id) => {
  const stock = await Stock.findOne({
    where: {
      id: id,
    },
  });
  return stock;
};

const getStocks = async (offset) => {
  const stock = await Stock.findAll({
    offset: offset,
    limit: 10,
  });
  const rowCount = await Stock.count();
  return {
    stock: stock,
    rowCount: rowCount,
  };
};

const getStockByBarcode = async (barcode) => {
  const stock = await Stock.findOne({
    where: {
      barcode: barcode,
    },
  });
  return stock;
};

const insertStocks = (stocks) => {
  Array.isArray(stocks)
    ? (() => {
        stocks.forEach(async (s) => {
          await Stock.findOne({ where: { barcode: s.barcode } }).then((one) => {
            one
              ? Stock.update(
                  {
                    amount: one.amount + s.amount,
                    updatedAt: new Date(),
                  },
                  { where: { id: one.id } }
                )
              : Stock.create(s);
          });
        });
      })()
    : (async () => {
        await Stock.create(stocks);
      })();

  return true;
};

const deleteStocks = async (stocks) => {
  Stock.destroy({
    where: {
      id: stocks,
    },
  });

  return true;
};

const updateStocks = async (stocks) => {
  await Stock.update(
    {
      name: stocks.name,
      barcode: stocks.barcode,
      amount: stocks.amount,
      updatedAt: new Date(),
    },
    {
      where: {
        id: stocks.id,
      },
    }
  );
  return true;
};

const getKey = () => {
  return "9b6f1dd50b4f48ce87a1";
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
