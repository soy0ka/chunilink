/*
  Warnings:

  - You are about to drop the column `character_id` on the `Player` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_character_id_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "character_id";

-- CreateTable
CREATE TABLE "player_character" (
    "id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "player_character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_character_player_id_character_id_key" ON "player_character"("player_id", "character_id");

-- AddForeignKey
ALTER TABLE "player_character" ADD CONSTRAINT "player_character_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_character" ADD CONSTRAINT "player_character_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
