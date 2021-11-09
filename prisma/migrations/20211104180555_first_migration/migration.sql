-- CreateEnum
CREATE TYPE "LicenseQlik" AS ENUM ('professional', 'analyzer');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "id_qlik" TEXT NOT NULL,
    "license_qlik" "LicenseQlik",
    "is_admin" BOOLEAN NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "space_id" TEXT NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vision" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "layout" JSONB,
    "group_id" TEXT NOT NULL,

    CONSTRAINT "vision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "panel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "vision_id" TEXT NOT NULL,

    CONSTRAINT "panel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_panel" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "vision_id" TEXT NOT NULL,

    CONSTRAINT "user_panel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "space_name_key" ON "space"("name");

-- CreateIndex
CREATE UNIQUE INDEX "space_slug_key" ON "space"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "panel_url_key" ON "panel"("url");

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vision" ADD CONSTRAINT "vision_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "panel" ADD CONSTRAINT "panel_vision_id_fkey" FOREIGN KEY ("vision_id") REFERENCES "vision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_panel" ADD CONSTRAINT "user_panel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_panel" ADD CONSTRAINT "user_panel_vision_id_fkey" FOREIGN KEY ("vision_id") REFERENCES "vision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
