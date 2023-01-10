import Menu from "../../entity/Menu.js";
import Stock from "../../entity/Stock.js";
import constant from "../../const/MenuConstant.js";

const getMenus = async (offset) => {
  let menu;
  if (offset === "all") {
    menu = await Menu.findAll();
  } else {
    menu = await Menu.findAll({
      offset: offset,
      limit: 10,
    });
  }

  menu.forEach(async (m, i) => {
    const ingredient = JSON.parse(m.ingredient.toString());
    m.dataValues.ingredient = ingredient;
    m.dataValues.amount = await Stock.min("amount", {
      where: {
        id: [...ingredient.map((i) => i.id)],
      },
    });
    m.dataValues.index = i + 1;
    m.dataValues.count = 0;
  });

  const rowCount = await Menu.count();

  return {
    menu: menu,
    rowCount: rowCount,
  };
};

const getMenu = async (id) => {
  const menu = await Menu.findOne({
    where: {
      id: id,
    },
  });

  const ingredient = JSON.parse(menu.ingredient.toString());
  menu.dataValues.ingredient = ingredient;
  let enable = true;

  ingredient.forEach(async (i) => {
    let stock = await Stock.findOne({
      where: {
        id: i.id,
      },
    });
    stock || stock.amount || (() => (enable = false))();
  });
  enable &&
    (() => {
      menu.dataValues.enable = true;
    })();
  return menu;
};

const getTypes = () => {
  return constant.MENU;
};

const insertMenu = async (menu) => {
  await Menu.create(menu);
  return true;
};

const updateImage = async (id, image) => {
  await Menu.update(
    {
      image: image,
      updatedAt: new Date(),
    },
    {
      where: {
        id: id,
      },
    }
  );
  return true;
};

const updateMenus = async (menu) => {
  const m = {};
  await Menu.update(
    {
      ...menu,
      updatedAt: new Date(),
    },
    {
      where: {
        id: menu.id,
      },
    }
  );
  return true;
};

const orderMenus = async (menu) => {
  await menu.forEach((m) => {
    m.ingredient.forEach(async (i) => {
      await Stock.update(
        { amount: i.amount - m.count, updatedAt: new Date() },
        {
          where: {
            id: i.id,
          },
        }
      );
    });
  });
  return true;
};

const deleteMenus = async (menu) => {
  Menu.destroy({
    where: {
      id: menu,
    },
  });
  return true;
};

export default {
  getMenu,
  getMenus,
  insertMenu,
  updateMenus,
  updateImage,
  orderMenus,
  deleteMenus,
  getTypes,
};
