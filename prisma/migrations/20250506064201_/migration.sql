-- CreateEnum
CREATE TYPE "HonorClass" AS ENUM ('NONE', 'SILVER', 'GOLD', 'PLATINA', 'RAINBOW');

-- CreateTable
CREATE TABLE "PlayerHonor" (
    "id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "honor_id" TEXT NOT NULL,
    "is_displayed" BOOLEAN NOT NULL DEFAULT false,
    "display_order" INTEGER DEFAULT 0,

    CONSTRAINT "PlayerHonor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Honor" (
    "id" TEXT NOT NULL,
    "class" "HonorClass" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Honor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerHonor_player_id_honor_id_key" ON "PlayerHonor"("player_id", "honor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Honor_class_name_key" ON "Honor"("class", "name");

-- AddForeignKey
ALTER TABLE "PlayerHonor" ADD CONSTRAINT "PlayerHonor_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerHonor" ADD CONSTRAINT "PlayerHonor_honor_id_fkey" FOREIGN KEY ("honor_id") REFERENCES "Honor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
