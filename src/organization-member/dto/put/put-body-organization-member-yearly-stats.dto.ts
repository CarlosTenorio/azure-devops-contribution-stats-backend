import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PutBodyOrganizationMemberYearlyStatsDto {
  @ApiProperty({
    description: 'Total number of code reviews made',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  commentsRatePerPRPercent?: number;
  @ApiProperty({
    description: 'Total number of pull requests created',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  prCommentsMade?: number;
  @ApiProperty({
    description: 'Total number of pull requests closed',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  prsClosed?: number;
  @ApiProperty({
    description: 'Total number of pull requests created',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  prsReviewed?: number;
  @ApiProperty({
    description: 'Total number of work items assigned',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  workItemsAssigned?: number;
  @ApiProperty({
    description: 'Total number of work items closed',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  workItemsCreated?: number;
  @ApiProperty({
    description: 'Most active repositories',
    required: false,
  })
  @IsOptional()
  reposMostActive?: PutBodyOrganizationMemberYearlyStatsRepoMostActiveDto[];
  @ApiProperty({
    description: 'Pull requests',
    required: false,
  })
  @IsOptional()
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
