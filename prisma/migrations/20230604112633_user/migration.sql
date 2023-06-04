/*
  Warnings:

  - The values [Home,Gaming,Phones] on the enum `TCategory_Enum` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "TUser_Role_Enum" AS ENUM ('ADMIN', 'USER');

-- AlterEnum
BEGIN;
CREATE TYPE "TCategory_Enum_new" AS ENUM ('HOME', 'GAMING', 'PHONES');
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "TCategory_Enum_new" USING ("category"::text::"TCategory_Enum_new");
ALTER TYPE "TCategory_Enum" RENAME TO "TCategory_Enum_old";
ALTER TYPE "TCategory_Enum_new" RENAME TO "TCategory_Enum";
DROP TYPE "TCategory_Enum_old";
COMMIT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "TUser_Role_Enum" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
