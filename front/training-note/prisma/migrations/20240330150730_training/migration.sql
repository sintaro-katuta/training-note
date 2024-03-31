/*
  Warnings:

  - You are about to drop the column `name` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Training` table. All the data in the column will be lost.
  - Added the required column `level` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `play` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Training" DROP COLUMN "name",
DROP COLUMN "url",
ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "play" INTEGER NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
