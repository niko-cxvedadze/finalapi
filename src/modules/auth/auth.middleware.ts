import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import { TTokenData } from "./auth.types";

export function protect(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY as string
    ) as TTokenData;

    (req as any).user = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
}
