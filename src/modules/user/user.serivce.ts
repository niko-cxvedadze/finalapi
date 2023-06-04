import { Prisma, User } from "@prisma/client";

import { db } from "@src/utils/db";

export async function getUser(
  where: Prisma.UserWhereUniqueInput
): Promise<User> {
  const user = await db.user.findUnique({
    where,
  });

  if (!user) {
    throw new Error(`getUser failed`);
  }

  return user;
}

export async function createUser(body: Prisma.UserCreateInput): Promise<User> {
  try {
    const createdUser = await db.user.create({ data: body });
    return createdUser;
  } catch (error) {
    throw new Error("createUser failed");
  }
}
