import { ApiProperty } from '@nestjs/swagger';
import { BaseCompanyResponseDto } from './base-company-response.dto';

export class GetCompaniesDto extends BaseCompanyResponseDto {
  @ApiProperty({
    description: 'Users in the company',
    required: false,
  })
  users?: any[];

  @ApiProperty({
    description: 'Teams in the company',
    required: false,
  })
  teams?: any[];
}
