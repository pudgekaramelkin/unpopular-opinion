/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Opinion` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Opinion" ADD COLUMN     "serialNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Opinion_serialNumber_key" ON "Opinion"("serialNumber");
