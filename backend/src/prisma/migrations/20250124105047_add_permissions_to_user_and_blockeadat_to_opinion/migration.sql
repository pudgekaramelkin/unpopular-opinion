-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('BLOCK_OPINIONS', 'ALL');

-- AlterTable
ALTER TABLE "Opinion" ADD COLUMN     "blockedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "UserPermission"[];
