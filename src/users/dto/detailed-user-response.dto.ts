import { ApiProperty } from '@nestjs/swagger';
import { BaseUserResponseDto } from './base-user-response.dto';
import { CompanyResponseDto } from './company-response.dto';
import { TeamResponseDto } from './team-response.dto';

export class UserResponseDto extends BaseUserResponseDto {
  @ApiProperty({
    description: 'Company details',
    type: CompanyResponseDto,
    required: false,
  })
  company?: CompanyResponseDto;

  @ApiProperty({
    description: 'Team details',
    type: TeamResponseDto,
    required: false,
    nullable: true,
  })
  team?: TeamResponseDto | null;
}
