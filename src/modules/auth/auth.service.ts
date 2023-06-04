import jwt from "jsonwebtoken";
import { User, Prisma } from "@prisma/client";
import { TTokenData } from "./auth.types";
import { hashPassword } from "./auth.utils";

import { createUser, getUser } from "../user/user.serivce";
import { comparePassword } from "./auth.utils";

export async function generateToken(user: User) {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role } as TTokenData,
    process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
    {
      expiresIn: "1d",
    }
  );

  return { accessToken };
}

export async function signUp(body: Prisma.UserCreateInput) {
  const { username, email, password, role } = body;
  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    username,
    password: hashedPassword,
    email,
    role,
  });

  return user;
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await getUser({ email });

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const { accessToken } = await generateToken(user);

  return {
    accessToken,
  };
}
