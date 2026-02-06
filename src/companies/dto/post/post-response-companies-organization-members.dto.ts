import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PostResponseCompaniesOrganizationMemberDto } from './post-response-companies-organization-member.dto';

export class PostResponseCompaniesOrganizationMembersDto {
  @ApiProperty({
    description: 'Members  added to the organization',
    name: 'members',
    type: [PostResponseCompaniesOrganizationMemberDto],
  })
  @IsNotEmpty()
  members: PostResponseCompaniesOrganizationMemberDto[];
}
