/*
  Warnings:

  - A unique constraint covering the columns `[azureId]` on the table `UserTeam` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `azureId` to the `UserTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserTeam" ADD COLUMN     "azureId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserTeam_azureId_key" ON "UserTeam"("azureId");
