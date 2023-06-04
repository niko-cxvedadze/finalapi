import express from "express";

import ProductsController from "./products.controller";

import { protect } from "../auth/auth.middleware";
import { isAdmin } from "../user/user.middlewares";

export const ProductsRouter = express.Router();

ProductsRouter.get("/", ProductsController.getProducts);

ProductsRouter.get("/:id", ProductsController.getProduct);

ProductsRouter.post("/", protect, isAdmin, ProductsController.createProduct);

ProductsRouter.put("/:id", protect, isAdmin, ProductsController.updateProduct);

ProductsRouter.delete(
  "/:id",
  protect,
  isAdmin,
  ProductsController.deleteProduct
);
