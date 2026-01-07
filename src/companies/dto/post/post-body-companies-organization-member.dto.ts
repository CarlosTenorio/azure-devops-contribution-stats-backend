import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostBodyCompaniesOrganizationMemberDto {
  @ApiProperty({
    description: 'Azure ID of the member to be added to the company',
    name: 'azureId',
  })
  @IsNotEmpty()
  @IsString()
  azureId: string;

  @ApiProperty({
    description: 'Display name of the member to be added to the company',
    name: 'displayName',
  })
  @IsNotEmpty()
  @IsString()
  displayName: string;

  @ApiProperty({
    description: 'Image URL of the member to be added to the company',
    name: 'imageUrl',
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'Unique name of the member to be added to the company',
    name: 'uniqueName',
  })
  @IsNotEmpty()
  @IsString()
  uniqueName: string;
}
