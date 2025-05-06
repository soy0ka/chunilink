-- CreateEnum
CREATE TYPE "PlayerRegion" AS ENUM ('JP', 'ASIA');

-- CreateEnum
CREATE TYPE "DifficultyCode" AS ENUM ('BASIC', 'ADVANCED', 'EXPERT', 'MASTER', 'ULTIMA', 'WORLDS_END');

-- CreateEnum
CREATE TYPE "Version" AS ENUM ('CHUNITHM', 'CHUNITHM_PLUS', 'AIR', 'AIR_PLUS', 'STAR', 'STAR_PLUS', 'AMAZON', 'AMAZON_PLUS', 'PARADISE', 'PARADISE_LOST', 'SUPERSTAR', 'SUPERSTAR_PLUS', 'NEW', 'NEW_PLUS', 'SUN', 'SUN_PLUS', 'LUMINOUS', 'LUMINOUS_PLUS', 'VERSE');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('POPS_AND_ANIME', 'NICONICO', 'TOUHOU_PROJECT', 'ORIGINAL', 'VARIETY', 'IRODORI', 'GEKIMAI');

-- CreateEnum
CREATE TYPE "PlayRank" AS ENUM ('D', 'C', 'B', 'BB', 'BBB', 'A', 'AA', 'AAA', 'S', 'S_PLUS', 'SS', 'SS_PLUS', 'SSS', 'SSS_PLUS');

-- CreateEnum
CREATE TYPE "ComboType" AS ENUM ('FULL_COMBO', 'ALL_JUSTICE', 'ALL_JUSTICE_CRITICAL');

-- CreateEnum
CREATE TYPE "ClearType" AS ENUM ('FAIL', 'CLEAR', 'HARD', 'BRAVE', 'ABSOLUTE', 'CATASTROPHY');

-- CreateEnum
CREATE TYPE "CToCType" AS ENUM ('FULL_CHAIN', 'FULL_CHAIN_PLUS');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "friend_code" TEXT NOT NULL,
    "region" "PlayerRegion" NOT NULL DEFAULT 'ASIA',
    "level" INTEGER NOT NULL,
    "rating" DECIMAL(7,4) NOT NULL DEFAULT 0,
    "new_rating" DECIMAL(7,4) NOT NULL DEFAULT 0,
    "old_rating" DECIMAL(7,4) NOT NULL DEFAULT 0,
    "character_id" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerScore" (
    "id" TEXT NOT NULL,
    "rating" DECIMAL(7,4),
    "player_id" TEXT NOT NULL,
    "song_id" TEXT NOT NULL,
    "difficulty" "DifficultyCode" NOT NULL,
    "play_rank" "PlayRank" NOT NULL DEFAULT 'D',
    "score" INTEGER NOT NULL,
    "clear_type" "ClearType" NOT NULL,
    "combo_type" "ComboType",
    "ctoc_type" "CToCType",

    CONSTRAINT "PlayerScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_kana" TEXT,
    "title_korean" TEXT,
    "artist_name" TEXT,
    "image_url" TEXT NOT NULL,
    "bpm" INTEGER NOT NULL,
    "version" "Version" NOT NULL,
    "genre" "Genre" NOT NULL,
    "release_jp_date" TIMESTAMP(3) NOT NULL,
    "release_intl_date" TIMESTAMP(3) NOT NULL,
    "wiki_url" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongDifficulty" (
    "id" TEXT NOT NULL,
    "song_id" TEXT NOT NULL,
    "difficulty" "DifficultyCode" NOT NULL,
    "designer_name" TEXT,
    "level_disply" INTEGER NOT NULL,
    "level_value" DECIMAL(4,2) NOT NULL,
    "chart_path" TEXT,
    "notes_total" INTEGER NOT NULL,
    "notes_tap" INTEGER NOT NULL,
    "notes_hold" INTEGER NOT NULL,
    "notes_slide" INTEGER NOT NULL,
    "notes_air" INTEGER NOT NULL,
    "notes_flick" INTEGER NOT NULL,

    CONSTRAINT "SongDifficulty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankRange" (
    "id" TEXT NOT NULL,
    "rank" "PlayRank" NOT NULL,
    "minScore" INTEGER NOT NULL,
    "maxScore" INTEGER NOT NULL,

    CONSTRAINT "RankRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PlayerToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_provider_account_id_key" ON "account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "session_session_token_key" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_identifier_token_key" ON "verification_token"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Player_slug_key" ON "Player"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerScore_player_id_song_id_difficulty_key" ON "PlayerScore"("player_id", "song_id", "difficulty");

-- CreateIndex
CREATE UNIQUE INDEX "SongDifficulty_song_id_difficulty_key" ON "SongDifficulty"("song_id", "difficulty");

-- CreateIndex
CREATE UNIQUE INDEX "RankRange_rank_key" ON "RankRange"("rank");

-- CreateIndex
CREATE INDEX "_PlayerToUser_B_index" ON "_PlayerToUser"("B");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerScore" ADD CONSTRAINT "PlayerScore_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerScore" ADD CONSTRAINT "PlayerScore_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongDifficulty" ADD CONSTRAINT "SongDifficulty_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToUser" ADD CONSTRAINT "_PlayerToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToUser" ADD CONSTRAINT "_PlayerToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
