import express from "express";

import menuController from "../../controller/menu/MenuController.js";

import wrapper from "../../util/wrapper.js";
import upload from "../../util/multer.js";

const menuRouter = express.Router();

menuRouter.get("/", wrapper.asyncWrapper(menuController.getMenus));
menuRouter.get("/:id", wrapper.asyncWrapper(menuController.getMenu));
menuRouter.get("/type/list", wrapper.asyncWrapper(menuController.getTypes));
menuRouter.post(
  "/",
  upload.single("image"),
  wrapper.asyncWrapper(menuController.insertMenu)
);
menuRouter.put("/", wrapper.asyncWrapper(menuController.updateMenus));
menuRouter.put(
  "/image",
  upload.single("image"),
  wrapper.asyncWrapper(menuController.updateImage)
);
menuRouter.delete("/", wrapper.asyncWrapper(menuController.deleteMenus));

export default menuRouter;
