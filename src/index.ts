import express from "express";
import cors from "cors";

import * as dotenv from "dotenv";

// Routers
import { AuthRouter } from "./modules/auth/auth.router";
import { ProductsRouter } from "./modules/products/products.router";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/products", ProductsRouter);

app.listen(process.env["PORT"] || 3000, () =>
  console.log(`Server is listening on port ${process.env["PORT"] || 3000}`)
);
