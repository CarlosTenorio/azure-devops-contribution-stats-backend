import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserTeamResponseDto {
  @ApiProperty({
    description: 'User Azure ID',
    example: 'azure-unique-id-12345',
  })
  @IsString()
  @IsNotEmpty()
  azureId: string;

  @ApiProperty({
    description: 'User display name',
    example: 'John D.',
  })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'User image URL',
    example: 'https://example.com/images/user12345.png',
  })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({
    description: 'User unique name',
    example: 'unique.user.name',
  })
  @IsString()
  @IsNotEmpty()
  uniqueName: string;
}
