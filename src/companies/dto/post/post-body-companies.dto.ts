import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostBodyCompaniesDto {
  @ApiProperty({
    description: 'Name of the company',
    example: 'Acme Corporation',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'Minimum number of PRs closed to be considered a good contributor',
    example: 80,
    required: false,
    default: 80,
  })
  @IsOptional()
  minPRsClosedToBeGoodContributor?: number;

  @ApiProperty({
    description:
      'Minimum number of PRs reviewed to be considered a good reviewer',
    example: 200,
    required: false,
    default: 200,
  })
  @IsOptional()
  minPrsReviewedToBeGoodReviewer?: number;

  @ApiProperty({
    description:
      'Minimum number of work items created to be considered a good contributor',
    example: 200,
    required: false,
    default: 200,
  })
  @IsOptional()
  minWorkItemsCreatedToBeGoodContributor?: number;

  @ApiProperty({
    description:
      'Minimum number of work items assigned to be considered a good contributor',
    example: 200,
    required: false,
    default: 200,
  })
  @IsOptional()
  minWorkItemsAssignedToBeGoodContributor?: number;

  @ApiProperty({
    description:
      'Minimum comments rate per PR percent to be considered a good reviewer',
    example: 15,
    required: false,
    default: 15,
  })
  @IsOptional()
  minCommentsRatePerPRPercentToBeGoodReviewer?: number;

  @ApiProperty({
    description: 'URL of the project associated with the company',
    example: 'https://dev.azure.com/acme-corp/',
    required: false,
  })
  @IsOptional()
  projectURL?: string;

  @ApiProperty({
    description: 'ID of the owner user',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  ownerUserId: string;
}
