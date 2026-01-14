export class PutBodyOrganizationMemberYearlyStatsDto {
  commentsRatePerPRPercent?: number;
  prCommentsMade?: number;
  prsClosed?: number;
  prsReviewed?: number;
  workItemsAssigned?: number;
  workItemsCreated?: number;
  reposMostActive?: PutBodyOrganizationMemberYearlyStatsRepoMostActiveDto[];
  pullRequests?: PutBodyOrganizationMemberYearlyStatsPullRequestDto[];
}

export class PutBodyOrganizationMemberYearlyStatsRepoMostActiveDto {
  closedAt?: Date;
  commentsMade?: number;
  createdAt?: Date;
  mergedAt?: Date | null;
  prId?: string;
  reviewerIds?: string[];
  title?: string;
}

export class PutBodyOrganizationMemberYearlyStatsPullRequestDto {
  closedDate?: Date;
  codeReviewAzureId?: string;
  pullRequestAzureId?: string;
  repositoryAzureId?: string;
  repositoryName?: string;
  repositoryUrl?: string;
  status?: PullRequestStatus;
  title?: string;
  yearlyStatsId?: string;
}

export enum PullRequestStatus {
  ABANDONED = 'ABANDONED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  NOT_SET = 'NOT_SET',
}
