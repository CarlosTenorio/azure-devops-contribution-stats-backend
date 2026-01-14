import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserTeamResponseDto } from './user-team-response.dto';

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
    description: 'Indicates if the team is expanded',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  expanded: boolean;

  @ApiProperty({ description: 'Team creation timestamp' })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ description: 'Team last update timestamp' })
  @IsNotEmpty()
  updatedAt: Date;

  @ApiProperty({ description: 'List of users in the team', type: [Object] })
  @IsNotEmpty()
  users: UserTeamResponseDto[];
}
