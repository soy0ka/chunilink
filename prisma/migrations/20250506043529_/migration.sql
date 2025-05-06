/*
  Warnings:

  - The values [IRODORI] on the enum `Genre` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Genre_new" AS ENUM ('POPS_AND_ANIME', 'NICONICO', 'TOUHOU_PROJECT', 'ORIGINAL', 'VARIETY', 'IRODORIMIDORI', 'GEKIMAI');
ALTER TABLE "Song" ALTER COLUMN "genre" TYPE "Genre_new" USING ("genre"::text::"Genre_new");
ALTER TYPE "Genre" RENAME TO "Genre_old";
ALTER TYPE "Genre_new" RENAME TO "Genre";
DROP TYPE "Genre_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Version" ADD VALUE 'CRYSTAL';
ALTER TYPE "Version" ADD VALUE 'CRYSTAL_PLUS';

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "release_jp_date" DROP NOT NULL,
ALTER COLUMN "release_intl_date" DROP NOT NULL;
