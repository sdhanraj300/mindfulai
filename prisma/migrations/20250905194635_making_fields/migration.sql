/*
  Warnings:

  - You are about to drop the column `provider` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[providerId,providerAccountId]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."account_provider_providerAccountId_key";

-- AlterTable
ALTER TABLE "public"."account" DROP COLUMN "provider",
ADD COLUMN     "providerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "account_providerId_providerAccountId_key" ON "public"."account"("providerId", "providerAccountId");
