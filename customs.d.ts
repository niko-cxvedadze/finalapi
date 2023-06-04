declare namespace Express {
  export interface Request {
    user?: import("./src/modules/auth/auth.types").TTokenData;
  }
  export interface Response {
    user?: import("./src/modules/auth/auth.types").TTokenData;
  }
}

declare module "query-types";
