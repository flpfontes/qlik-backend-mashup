-- DropForeignKey
ALTER TABLE "group" DROP CONSTRAINT "group_space_id_fkey";

-- DropForeignKey
ALTER TABLE "panel" DROP CONSTRAINT "panel_vision_id_fkey";

-- DropForeignKey
ALTER TABLE "user_vision" DROP CONSTRAINT "user_vision_vision_id_fkey";

-- DropForeignKey
ALTER TABLE "vision" DROP CONSTRAINT "vision_group_id_fkey";

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vision" ADD CONSTRAINT "vision_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "panel" ADD CONSTRAINT "panel_vision_id_fkey" FOREIGN KEY ("vision_id") REFERENCES "vision"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_vision" ADD CONSTRAINT "user_vision_vision_id_fkey" FOREIGN KEY ("vision_id") REFERENCES "vision"("id") ON DELETE CASCADE ON UPDATE CASCADE;
