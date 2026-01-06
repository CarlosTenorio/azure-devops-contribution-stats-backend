import { ApiProperty } from '@nestjs/swagger';

export class OrganizationMemberDto {
  @ApiProperty({
    description: 'Organization Member ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Azure AD Object ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  azureId: string;

  @ApiProperty({
    description: 'Organization Member display name',
    example: 'John Doe',
  })
  displayName: string;

  @ApiProperty({
    description: 'Organization Member email',
    example: 'member@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Organization Member image URL',
    example: 'https://example.com/image.png',
    required: false,
    nullable: true,
  })
  imageUrl?: string | null;

  @ApiProperty({
    description: 'Organization Member unique name',
    example: 'johndoe',
  })
  uniqueName: string;

  @ApiProperty({
    description: 'Organization Member creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Organization Member last update timestamp',
  })
  updatedAt: Date;
}
