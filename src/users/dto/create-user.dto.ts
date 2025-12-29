import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Company ID the user belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'Team ID the user belongs to (optional)',
    example: '123e4567-e89b-12d3-a456-426614174001',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  teamId?: string;

  @ApiProperty({
    description: 'OAuth ID from Azure DevOps',
    example: 'oauth-id-123456',
  })
  @IsNotEmpty()
  @IsString()
  oauthId: string;

  @ApiProperty({
    description: 'Connection string or identifier',
    example: 'azure-devops-connection',
  })
  @IsNotEmpty()
  @IsString()
  connection: string;
}
