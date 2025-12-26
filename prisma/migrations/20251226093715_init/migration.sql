-- CreateEnum
CREATE TYPE "PullRequestStatus" AS ENUM ('ABANDONED', 'ACTIVE', 'COMPLETED', 'NOT_SET');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING_TO_ACTIVATE');

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING_TO_ACTIVATE',
    "companyId" TEXT NOT NULL,
    "teamId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YearlyStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "commentsRatePerPRPercent" INTEGER NOT NULL DEFAULT 0,
    "prCommentsMade" INTEGER NOT NULL DEFAULT 0,
    "prsClosed" INTEGER NOT NULL DEFAULT 0,
    "prsReviewed" INTEGER NOT NULL DEFAULT 0,
    "workItemsAssigned" INTEGER NOT NULL DEFAULT 0,
    "workItemsCreated" INTEGER NOT NULL DEFAULT 0,
    "reposMostActive" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YearlyStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PullRequest" (
    "id" TEXT NOT NULL,
    "closedDate" TIMESTAMP(3) NOT NULL,
    "codeReviewAzureId" TEXT NOT NULL,
    "pullRequestAzureId" TEXT NOT NULL,
    "repositoryAzureId" TEXT NOT NULL,
    "repositoryName" TEXT NOT NULL,
    "repositoryUrl" TEXT NOT NULL,
    "status" "PullRequestStatus" NOT NULL,
    "title" TEXT NOT NULL,
    "yearlyStatsId" TEXT NOT NULL,

    CONSTRAINT "PullRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "YearlyStats_year_idx" ON "YearlyStats"("year");

-- CreateIndex
CREATE UNIQUE INDEX "YearlyStats_userId_year_key" ON "YearlyStats"("userId", "year");

-- CreateIndex
CREATE INDEX "PullRequest_yearlyStatsId_idx" ON "PullRequest"("yearlyStatsId");

-- CreateIndex
CREATE INDEX "PullRequest_closedDate_idx" ON "PullRequest"("closedDate");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearlyStats" ADD CONSTRAINT "YearlyStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PullRequest" ADD CONSTRAINT "PullRequest_yearlyStatsId_fkey" FOREIGN KEY ("yearlyStatsId") REFERENCES "YearlyStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
