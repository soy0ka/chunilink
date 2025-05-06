/*
  Warnings:

  - You are about to drop the `RankRange` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "RankRange";
