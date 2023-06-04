import { TUser_Role_Enum } from "@prisma/client";

export type TTokenData = {
  id: string;
  role: TUser_Role_Enum;
};
