import { ApiProperty } from '@nestjs/swagger';
import { TeamResponseDto } from 'src/users/dto';
import { BaseCompanyResponseDto } from './base-company-response.dto';
import { OrganizationMemberDto } from './organization-member.dto';

export class GetCompaniesDto extends BaseCompanyResponseDto {
  @ApiProperty({
    description: 'Users in the company',
    required: true,
    type: [OrganizationMemberDto],
  })
  organizationMembers: OrganizationMemberDto[];

  @ApiProperty({
    description: 'Teams in the company',
    required: true,
    type: [TeamResponseDto],
  })
  teams: TeamResponseDto[];
}
