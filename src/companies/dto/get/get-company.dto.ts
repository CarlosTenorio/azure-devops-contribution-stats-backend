import { ApiProperty } from '@nestjs/swagger';
import { BaseCompanyResponseDto } from '../base-company-response.dto';
import { OrganizationMemberDto } from '../organization-member.dto';
import { TeamResponseDto } from '../team-response.dto';

export class GetCompanyDto extends BaseCompanyResponseDto {
  @ApiProperty({
    description: 'List of teams associated with the company',
    type: [TeamResponseDto],
  })
  teams: TeamResponseDto[];

  @ApiProperty({
    description: 'List of organization members associated with the company',
    type: [OrganizationMemberDto],
  })
  organizationMembers: OrganizationMemberDto[];
}
