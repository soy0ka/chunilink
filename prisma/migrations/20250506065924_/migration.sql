-- CreateEnum
CREATE TYPE "RatingType" AS ENUM ('OLD', 'NEW', 'NONE');

-- AlterTable
ALTER TABLE "PlayerScore" ADD COLUMN     "rating_type" "RatingType" NOT NULL DEFAULT 'NONE';
