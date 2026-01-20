import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PutBodyOrganizationMemberYearlyStatsRepoMostActiveDto {
  @ApiProperty({ description: 'Pull Request ID', required: false })
  @IsString()
  @IsOptional()
  prId?: string;

  @ApiProperty({ description: 'Pull Request Title', required: false })
  @IsString()
  @IsOptional()
  title?: string;
}
