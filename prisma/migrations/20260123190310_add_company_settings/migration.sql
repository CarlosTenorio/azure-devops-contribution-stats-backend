/*
  Warnings:

  - You are about to drop the column `userId` on the `YearlyStats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizationMemberId,year]` on the table `YearlyStats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectURL` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationMemberId` to the `YearlyStats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "YearlyStats" DROP CONSTRAINT "YearlyStats_userId_fkey";

-- DropIndex
DROP INDEX "YearlyStats_userId_year_key";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "minCommentsRatePerPRPercentToBeGoodReviewer" INTEGER NOT NULL DEFAULT 15,
ADD COLUMN     "minPRsClosedToBeGoodContributor" INTEGER NOT NULL DEFAULT 80,
ADD COLUMN     "minPrsReviewedToBeGoodReviewer" INTEGER NOT NULL DEFAULT 200,
ADD COLUMN     "minWorkItemsAssignedToBeGoodContributor" INTEGER NOT NULL DEFAULT 200,
ADD COLUMN     "minWorkItemsCreatedToBeGoodContributor" INTEGER NOT NULL DEFAULT 200,
ADD COLUMN     "projectURL" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "YearlyStats" DROP COLUMN "userId",
ADD COLUMN     "organizationMemberId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "YearlyStats_organizationMemberId_year_key" ON "YearlyStats"("organizationMemberId", "year");

-- AddForeignKey
ALTER TABLE "YearlyStats" ADD CONSTRAINT "YearlyStats_organizationMemberId_fkey" FOREIGN KEY ("organizationMemberId") REFERENCES "OrganizationMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
