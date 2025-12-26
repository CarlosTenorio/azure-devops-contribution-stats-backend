import { ApiProperty } from '@nestjs/swagger';

export class TeamResponseDto {
  @ApiProperty({
    description: 'Team ID',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  id: string;

  @ApiProperty({
    description: 'Team name',
    example: 'Development Team',
  })
  name: string;

  @ApiProperty({
    description: 'Company ID the team belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  companyId: string;

  @ApiProperty({
    description: 'Team creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Team last update timestamp',
  })
  updatedAt: Date;
}
