import menuService from "../../service/menu/MenuService.js";
import errors from "../../models/core/errors.js";

const getMenus = (req) => {
  let pageNum = req.query.page; // 요청 페이지 넘버
  let offset = 0;
  if (!pageNum) {
    throw new errors.InvalidInputError("pageNum must not be null");
  }
  if (pageNum > 1) {
    offset = 10 * (pageNum - 1);
  }
  if ((req.query.page = "all")) {
    offset = "all";
  }
  const list = menuService.getMenus(offset);
  if (!list || list.length === 0) {
    throw new errors.InvalidInputError("contents is not exist");
  }
  return list;
};

const getMenu = (req) => {
  const { id } = req.params; // 요청 페이지 넘버
  return menuService.getMenu(id);
};

const getTypes = () => {
  return menuService.getTypes();
};

const insertMenu = (req) => {
  const menu = req.body;
  menu.image = req.file.originalname;

  if (!menu) {
    throw new errors.InvalidInputError("contents is not exist");
  }

  if (!menu.name) {
    throw new errors.InvalidInputError("name is must not be null or blank");
  }
  if (!menu.type_name) {
    throw new errors.InvalidInputError(
      "type_name is must not be null or blank"
    );
  }
  if (!menu.ingredient.length === 0) {
    throw new errors.InvalidInputError(
      "ingredient is must not be null or blank"
    );
  }

  return menuService.insertMenu(menu);
};

const updateMenus = (req) => {
  const menus = req.body;

  if (!menus || menus.length === 0) {
    throw new errors.InvalidInputError("contents is not exist");
  }

  return Array.isArray(menus)
    ? (() => {
        menus.forEach((m) => {
          if (!m.id) {
            throw new errors.InvalidInputError(
              "id is must not be null or blank"
            );
          }
        });

        return menuService.orderMenus(menus);
      })()
    : (() => {
        if (!menus.id) {
          throw new errors.InvalidInputError("id is must not be null or blank");
        }
        return menuService.updateMenus(menus);
      })();
};

const updateImage = (req) => {
  const { id } = req.body;
  const image = req.file.originalname;

  if (!image) {
    throw new errors.InvalidInputError("image is not exist");
  }

  return menuService.updateImage(id, image);
};

const deleteMenus = (req) => {
  const menus = req.body;
  if (!menus || menus.length === 0) {
    throw new errors.InvalidInputError("contents is not exist");
  }
  return menuService.deleteMenus(menus);
};

export default {
  getMenu,
  getMenus,
  getTypes,
  insertMenu,
  updateImage,
  updateMenus,
  deleteMenus,
};
