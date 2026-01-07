/*
  Warnings:

  - You are about to drop the column `email` on the `OrganizationMember` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "OrganizationMember_email_key";

-- AlterTable
ALTER TABLE "OrganizationMember" DROP COLUMN "email";
