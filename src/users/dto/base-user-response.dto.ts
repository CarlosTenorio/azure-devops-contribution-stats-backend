import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../../prisma/generated/enums';

export class BaseUserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
    nullable: true,
  })
  name: string | null;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User status',
    enum: UserStatus,
    example: UserStatus.PENDING_TO_ACTIVATE,
  })
  status: UserStatus;

  @ApiProperty({
    description: 'Company ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  companyId: string;

  @ApiProperty({
    description: 'Team ID',
    example: '123e4567-e89b-12d3-a456-426614174001',
    nullable: true,
  })
  teamId: string | null;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
  })
  updatedAt: Date;
}
