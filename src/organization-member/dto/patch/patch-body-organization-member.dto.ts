import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatchBodyOrganizationMemberDto {
  @ApiProperty({
    description: 'Azure ID of the organization member',
    required: false,
  })
  @IsOptional()
  @IsString()
  azureId?: string;

  @ApiProperty({
    description: 'Display name of the organization member',
    required: false,
  })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiProperty({
    description: 'Unique name of the organization member',
    required: false,
  })
  @IsOptional()
  @IsString()
  uniqueName?: string;

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
