import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PostBodyCompaniesOrganizationMemberDto } from './post-body-companies-organization-member.dto';

export class PostBodyCompaniesOrganizationMembersDto {
  @ApiProperty({
    description: 'Members to be added to the organization',
    name: 'members',
    type: [PostBodyCompaniesOrganizationMemberDto],
  })
  @IsNotEmpty()
  members: PostBodyCompaniesOrganizationMemberDto[];
}
