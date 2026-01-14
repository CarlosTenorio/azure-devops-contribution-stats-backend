export class PostBodyOrganizationMemberYearlyStatsDto {
  commentsRatePerPRPercent: number;
  prCommentsMade: number;
  prsClosed: number;
  prsReviewed: number;
  pullRequests: PostBodyOrganizationMemberYearlyStatsPullRequestDto[];
  reposMostActive: PostBodyOrganizationMemberYearlyStatsRepoMostActiveDto[];
  workItemsAssigned: number;
  workItemsCreated: number;
}

export class PostBodyOrganizationMemberYearlyStatsRepoMostActiveDto {
  contributions: number;
  repoId: string;
  repoName: string;
}

export class PostBodyOrganizationMemberYearlyStatsPullRequestDto {
  closedAt: Date;
  commentsMade: number;
  createdAt: Date;
  mergedAt: Date | null;
  prId: string;
  reviewerIds: string[];
  title: string;
}
