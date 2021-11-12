/*
  Warnings:

  - You are about to drop the `user_panel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_panel" DROP CONSTRAINT "user_panel_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_panel" DROP CONSTRAINT "user_panel_vision_id_fkey";

-- DropTable
DROP TABLE "user_panel";

-- CreateTable
CREATE TABLE "user_vision" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "vision_id" TEXT NOT NULL,

    CONSTRAINT "user_vision_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_vision" ADD CONSTRAINT "user_vision_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_vision" ADD CONSTRAINT "user_vision_vision_id_fkey" FOREIGN KEY ("vision_id") REFERENCES "vision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
