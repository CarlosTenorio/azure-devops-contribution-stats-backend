import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostBodyCompaniesDto {
  @ApiProperty({
    description: 'Name of the company',
    example: 'Acme Corporation',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
