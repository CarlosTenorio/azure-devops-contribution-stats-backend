import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostBodyCompaniesTeamDto {
  @ApiProperty({
    description: 'Name of the team',
    example: 'Development Team',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
