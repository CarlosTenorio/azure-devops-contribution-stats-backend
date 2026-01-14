import { ApiProperty } from '@nestjs/swagger';

export class BaseOrganizationMemberResponseDto {
  @ApiProperty({ description: 'Organization member ID' })
  id: string;

  @ApiProperty({ description: 'Azure ID of the organization member' })
  azureId: string;

  @ApiProperty({ description: 'Display name of the organization member' })
  displayName: string;

  @ApiProperty({ description: 'Unique name of the organization member' })
  uniqueName: string;

  @ApiProperty({
    description: 'Image URL of the organization member',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({ description: 'Company ID', required: false })
  companyId?: string;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
}
