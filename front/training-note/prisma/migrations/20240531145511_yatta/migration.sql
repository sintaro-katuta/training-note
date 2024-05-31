/*
  Warnings:

  - You are about to drop the column `date` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `weightId` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `play` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the `UserWeight` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_traingId_fkey";

-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_weightId_fkey";

-- DropForeignKey
ALTER TABLE "UserWeight" DROP CONSTRAINT "UserWeight_userId_fkey";

-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "date",
DROP COLUMN "weightId",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION,
ALTER COLUMN "traingId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "play";

-- DropTable
DROP TABLE "UserWeight";

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_traingId_fkey" FOREIGN KEY ("traingId") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
