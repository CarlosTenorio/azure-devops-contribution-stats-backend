import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PatchBodyTeamsDto {
  @ApiProperty({
    required: false,
    description: 'Expanded status of the team',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  expanded?: boolean;

  @ApiProperty({
    required: false,
    description: 'Name of the team',
    example: 'Development Team',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
