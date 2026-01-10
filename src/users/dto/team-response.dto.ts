import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TeamResponseDto {
  @ApiProperty({
    description: 'Team ID',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Team name', example: 'Development Team' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Company ID the team belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @ApiProperty({ description: 'Team creation timestamp' })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ description: 'Team last update timestamp' })
  @IsNotEmpty()
  updatedAt: Date;
}
