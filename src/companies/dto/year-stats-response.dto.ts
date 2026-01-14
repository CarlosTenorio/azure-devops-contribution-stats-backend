export class YearStatsResponseDto {
  commentsRatePerPRPercent?: number;
  prCommentsMade?: number;
  prsClosed?: number;
  prsReviewed?: number;
  workItemsAssigned?: number;
  workItemsCreated?: number;
  reposMostActive?: YearlyStatsRepoMostActiveDto[];
  pullRequests?: YearlyStatsPullRequestDto[];
}

export class YearlyStatsRepoMostActiveDto {
  closedAt?: Date;
  commentsMade?: number;
  createdAt?: Date;
  mergedAt?: Date | null;
  prId?: string;
  reviewerIds?: string[];
  title?: string;
}

export class YearlyStatsPullRequestDto {
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
