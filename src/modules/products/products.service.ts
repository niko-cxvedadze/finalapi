import { db } from "@src/utils/db";

import { Prisma } from "@prisma/client";

export async function getProducts(args: {
  skip?: string;
  take?: string;
  search?: string;
  category?: string;
}) {
  const { skip, take, search, category } = args;

  const products = await db.product.findMany({
    skip: Number(skip) || undefined,
    take: Number(take) || undefined,
    where: {
      AND: [
        { category: { equals: category } },
        {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
          ],
        },
      ],
    },
  });
  return products;
}

export async function getProduct(productId: string) {
  const product = await db.product.findUnique({ where: { id: productId } });

  if (!product) {
    throw new Error("product could not found");
  }

  return product;
}

export async function createProduct(body: Prisma.ProductCreateInput) {
  const { title, description, price, category } = body;

  const newProduct = await db.product.create({
    data: { title, description, price, category },
  });

  return newProduct;
}

export async function updateProduct(
  productId: string,
  body: Prisma.ProductUpdateInput
) {
  const { title, description, price, category } = body;
  const product = await getProduct(productId);

  if (product) {
    return await db.product.update({
      where: { id: product?.id },
      data: { title, description, price, category },
    });
  }
}

export async function deleteProduct(productId: string) {
  const product = await getProduct(productId);

  if (product) {
    return await db.product.delete({ where: { id: productId } });
  }
}
