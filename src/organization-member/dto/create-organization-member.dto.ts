import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationMemberDto {
  @ApiProperty({ description: 'Azure ID of the organization member' })
  @IsString()
  azureId: string;

  @ApiProperty({ description: 'Display name of the organization member' })
  @IsString()
  displayName: string;

  @ApiProperty({ description: 'Unique name of the organization member' })
  @IsString()
  uniqueName: string;

  @ApiProperty({
    description: 'Image URL of the organization member',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ description: 'Company ID', required: false })
  @IsOptional()
  @IsUUID()
  companyId?: string;
}
