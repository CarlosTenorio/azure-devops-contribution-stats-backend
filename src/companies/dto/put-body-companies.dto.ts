import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PutBodyCompaniesDto {
  @ApiProperty({
    description: 'Name of the company',
    example: 'Acme Corporation',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description:
      'Minimum comments rate per PR percent to be considered a good reviewer',
    example: 12,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  minCommentsRatePerPRPercentToBeGoodReviewer?: number;

  @ApiProperty({
    description: 'Minimum PRs closed to be considered a good contributor',
    example: 5,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  minPRsClosedToBeGoodContributor?: number;

  @ApiProperty({
    description: 'Minimum PRs reviewed to be considered a good reviewer',
    example: 5,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  minPrsReviewedToBeGoodReviewer?: number;

  @ApiProperty({
    description:
      'Minimum work items assigned to be considered a good contributor',
    example: 5,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  minWorkItemsAssignedToBeGoodContributor?: number;

  @ApiProperty({
    description:
      'Minimum work items created to be considered a good contributor',
    example: 5,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  minWorkItemsCreatedToBeGoodContributor?: number;

  @ApiProperty({
    description: 'URL of the project associated with the company',
    example: 'https://dev.azure.com/organization/project',
    required: false,
  })
  @IsString()
  @IsOptional()
  projectURL?: string;
}
