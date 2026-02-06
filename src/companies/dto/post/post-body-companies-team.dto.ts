import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostBodyCompaniesTeamDto {
  @ApiProperty({
    description: 'Name of the team',
    example: 'Development Team',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Whether the team is expanded by default',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  expanded?: boolean;
}
