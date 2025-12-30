import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostBodyCompaniesDto {
  @ApiProperty({
    description: 'Name of the company',
    example: 'Acme Corporation',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    description: 'ID of the owner user',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  ownerUserId: string;
}
