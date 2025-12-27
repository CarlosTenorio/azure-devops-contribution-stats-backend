import { ApiProperty } from '@nestjs/swagger';

export class BaseStatsResponseDto {
  @ApiProperty({
    description: 'Stats ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'User ID the stats belong to',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  userId: string;

  @ApiProperty({
    description: 'Year of the statistics',
    example: 2024,
  })
  year: number;

  @ApiProperty({
    description: 'Comments rate per PR percentage',
    example: 85,
  })
  commentsRatePerPRPercent: number;

  @ApiProperty({
    description: 'Number of PR comments made',
    example: 45,
  })
  prCommentsMade: number;

  @ApiProperty({
    description: 'Number of PRs closed',
    example: 23,
  })
  prsClosed: number;

  @ApiProperty({
    description: 'Number of PRs reviewed',
    example: 67,
  })
  prsReviewed: number;

  @ApiProperty({
    description: 'Number of work items assigned',
    example: 15,
  })
  workItemsAssigned: number;

  @ApiProperty({
    description: 'Number of work items created',
    example: 8,
  })
  workItemsCreated: number;

  @ApiProperty({
    description: 'Most active repositories',
    example: ['repo1', 'repo2'],
    type: [String],
  })
  reposMostActive: string[];

  @ApiProperty({
    description: 'Stats creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Stats last update timestamp',
  })
  updatedAt: Date;
}
