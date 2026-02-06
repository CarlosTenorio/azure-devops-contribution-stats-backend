import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseCompanyResponseDto {
  @ApiProperty({
    description: 'Company ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Company name',
    example: 'Acme Corporation',
  })
  name: string;
  @ApiProperty({
    description:
      'Minimum comments rate per PR percent to be considered a good reviewer',
    example: 12,
  })
  @IsNumber()
  @IsNotEmpty()
  minCommentsRatePerPRPercentToBeGoodReviewer: number;

  @ApiProperty({
    description: 'Minimum PRs closed to be considered a good contributor',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  minPRsClosedToBeGoodContributor: number;

  @ApiProperty({
    description: 'Minimum PRs reviewed to be considered a good reviewer',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  minPrsReviewedToBeGoodReviewer: number;

  @ApiProperty({
    description:
      'Minimum work items assigned to be considered a good contributor',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  minWorkItemsAssignedToBeGoodContributor: number;

  @ApiProperty({
    description:
      'Minimum work items created to be considered a good contributor',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  minWorkItemsCreatedToBeGoodContributor: number;

  @ApiProperty({
    description: 'URL of the project associated with the company',
    example: 'https://dev.azure.com/organization/project',
  })
  @IsString()
  @IsOptional()
  projectURL?: string;

  @ApiProperty({
    description: 'Company creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Company last update timestamp',
  })
  updatedAt: Date;
}
