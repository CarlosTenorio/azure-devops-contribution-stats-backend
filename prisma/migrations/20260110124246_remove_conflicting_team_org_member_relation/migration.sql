/*
  Warnings:

  - You are about to drop the `UserTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserTeam" DROP CONSTRAINT "UserTeam_teamId_fkey";

-- DropTable
DROP TABLE "UserTeam";

-- CreateTable
CREATE TABLE "_OrganizationMemberToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrganizationMemberToTeam_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrganizationMemberToTeam_B_index" ON "_OrganizationMemberToTeam"("B");

-- AddForeignKey
ALTER TABLE "_OrganizationMemberToTeam" ADD CONSTRAINT "_OrganizationMemberToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "OrganizationMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationMemberToTeam" ADD CONSTRAINT "_OrganizationMemberToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
