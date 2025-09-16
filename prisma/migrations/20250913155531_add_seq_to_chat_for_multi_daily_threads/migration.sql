/*
  Warnings:

  - A unique constraint covering the columns `[userId,dateBucket,seq]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Chat_userId_dateBucket_key";

-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "seq" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_userId_dateBucket_seq_key" ON "public"."Chat"("userId", "dateBucket", "seq");
