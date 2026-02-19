/*
  Warnings:

  - The primary key for the `Issues` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Issues" DROP CONSTRAINT "Issues_pkey",
ADD COLUMN     "issueId" SERIAL NOT NULL,
ADD CONSTRAINT "Issues_pkey" PRIMARY KEY ("issueId");
