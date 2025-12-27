import { ApiProperty } from '@nestjs/swagger';
import { BaseStatsResponseDto } from './base-stats-response.dto';

export class DetailedStatsResponseDto extends BaseStatsResponseDto {
  @ApiProperty({
    description: 'User details',
    required: false,
  })
  user?: any;

  @ApiProperty({
    description: 'Pull requests associated with these stats',
    required: false,
  })
  pullRequests?: any[];
}
