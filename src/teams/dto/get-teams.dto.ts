import { ApiProperty } from '@nestjs/swagger';
import { BaseTeamResponseDto } from './base-team-response.dto';

export class GetTeamsDto extends BaseTeamResponseDto {
  @ApiProperty({
    description: 'Company details',
    required: false,
  })
  company?: any;

  @ApiProperty({
    description: 'Users in the team',
    required: false,
  })
  users?: any[];
}
