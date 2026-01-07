import { ApiProperty } from '@nestjs/swagger';
import { BaseUserResponseDto } from '../base-user-response.dto';
import { CompanyResponseDto } from '../company-response.dto';

export class GetResponseUserDto extends BaseUserResponseDto {
  @ApiProperty({
    description: 'Company details',
    type: CompanyResponseDto,
    required: false,
    nullable: true,
  })
  companyOwned?: CompanyResponseDto | null;

  @ApiProperty({
    description: 'Company from which the user received an invitation',
    type: CompanyResponseDto,
    required: false,
    nullable: true,
  })
  companyWhereComesInvitation?: CompanyResponseDto | null;
}
