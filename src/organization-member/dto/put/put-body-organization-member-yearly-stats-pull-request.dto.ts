import { ApiProperty } from '@nestjs/swagger';
import { PullRequestStatus } from '../../../shared/dto';
import { IsOptional, IsDate, IsString } from 'class-validator';

export class PutBodyOrganizationMemberYearlyStatsPullRequestDto {
  @ApiProperty({ description: 'Pull Request closed date', required: false })
  @IsOptional()
  @IsDate()
  closedDate?: Date;

  @ApiProperty({ description: 'Code Review Azure ID', required: false })
  @IsOptional()
  @IsString()
  codeReviewAzureId?: string;

  @ApiProperty({ description: 'Pull Request Azure ID', required: false })
  @IsOptional()
  @IsString()
  pullRequestAzureId?: string;

  @ApiProperty({ description: 'Repository Azure ID', required: false })
  @IsOptional()
  @IsString()
  repositoryAzureId?: string;

  @ApiProperty({ description: 'Repository Name', required: false })
  @IsOptional()
  @IsString()
  repositoryName?: string;

  @ApiProperty({ description: 'Repository URL', required: false })
  @IsOptional()
  @IsString()
  repositoryUrl?: string;

  @ApiProperty({
    description: 'Pull Request Status',
    required: false,
    enum: PullRequestStatus,
  })
  @IsOptional()
  status?: PullRequestStatus;

  @ApiProperty({ description: 'Pull Request Title', required: false })
  @IsOptional()
  @IsString()
  title?: string;
}
