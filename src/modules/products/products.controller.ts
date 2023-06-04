import { Request, Response } from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./products.service";

class ProductsController {
  async getProducts(req: Request, res: Response) {
    const products = await getProducts(req.query);
    res.json(products);
  }

  async getProduct(req: Request, res: Response) {
    try {
      const product = await getProduct(req.params.id);
      res.json(product);
    } catch (error: any) {
      res.status(404).send(error.message);
    }
  }

  async createProduct(req: Request, res: Response) {
    const newProduct = await createProduct(req.body);
    res.json(newProduct);
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const updatedProduct = await updateProduct(req.params.id, req.body);
      res.json(updatedProduct);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const deletedProduct = await deleteProduct(req.params.id);
      res.json(deletedProduct);
    } catch (error: any) {
      res.status(403).send(error.message);
    }
  }
}

export default new ProductsController();
