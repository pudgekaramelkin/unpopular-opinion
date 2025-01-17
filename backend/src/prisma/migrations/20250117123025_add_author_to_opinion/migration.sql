/*
  Warnings:

  - Added the required column `authorId` to the `Opinion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Opinion" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
