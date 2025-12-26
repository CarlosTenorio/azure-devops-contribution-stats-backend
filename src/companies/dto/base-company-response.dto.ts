import { ApiProperty } from '@nestjs/swagger';

export class BaseCompanyResponseDto {
  @ApiProperty({
    description: 'Company ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Company name',
    example: 'Acme Corporation',
  })
  name: string;

  @ApiProperty({
    description: 'Company creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Company last update timestamp',
  })
  updatedAt: Date;
}
