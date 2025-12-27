import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class UpdateStatsDto {
  @ApiProperty({
    description: 'User ID the stats belong to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({
    description: 'Year of the statistics',
    example: 2024,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(2000)
  year?: number;

  @ApiProperty({
    description: 'Comments rate per PR percentage',
    example: 85,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  commentsRatePerPRPercent?: number;

  @ApiProperty({
    description: 'Number of PR comments made',
    example: 45,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  prCommentsMade?: number;

  @ApiProperty({
    description: 'Number of PRs closed',
    example: 23,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  prsClosed?: number;

  @ApiProperty({
    description: 'Number of PRs reviewed',
    example: 67,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  prsReviewed?: number;

  @ApiProperty({
    description: 'Number of work items assigned',
    example: 15,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  workItemsAssigned?: number;

  @ApiProperty({
    description: 'Number of work items created',
    example: 8,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  workItemsCreated?: number;

  @ApiProperty({
    description: 'Most active repositories',
    example: ['repo1', 'repo2'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  reposMostActive?: string[];
}
