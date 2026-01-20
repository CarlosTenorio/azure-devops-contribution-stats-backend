import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { PutBodyOrganizationMemberYearlyStatsPullRequestDto } from './put-body-organization-member-yearly-stats-pull-request.dto';
import { PutBodyOrganizationMemberYearlyStatsRepoMostActiveDto } from './put-body-organization-member-yearly-stats-repo-most-active.dto';

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
    type: [PutBodyOrganizationMemberYearlyStatsRepoMostActiveDto],
  })
  @IsOptional()
  reposMostActive?: PutBodyOrganizationMemberYearlyStatsRepoMostActiveDto[];

  @ApiProperty({ description: 'Pull requests', required: false })
  @IsOptional()
  pullRequests?: PutBodyOrganizationMemberYearlyStatsPullRequestDto[];
}
