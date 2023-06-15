import { Request, Response, NextFunction } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  switch (req.user?.role) {
    case "ADMIN": {
      next();
      break;
    }
    default: {
      res.status(403).send("permission denied");
      break;
    }
  }
}
