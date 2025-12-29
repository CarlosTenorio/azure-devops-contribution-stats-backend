import { ApiProperty } from '@nestjs/swagger';
import { BaseUserResponseDto } from '../base-user-response.dto';
import { CompanyResponseDto } from '../company-response.dto';
import { TeamResponseDto } from '../team-response.dto';

export class PostResponseUsersDto extends BaseUserResponseDto {
  @ApiProperty({
    description: 'Company details',
    type: CompanyResponseDto,
    required: false,
  })
  companyOwned?: CompanyResponseDto;

  @ApiProperty({
    description: 'Team details',
    type: TeamResponseDto,
    required: false,
    nullable: true,
  })
  team?: TeamResponseDto | null;
}
