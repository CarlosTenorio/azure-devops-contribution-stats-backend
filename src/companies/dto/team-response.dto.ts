import { CompanyResponseDto, UserTeamResponseDto } from 'src/users/dto';

export class TeamResponseDto {
  company: CompanyResponseDto;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  users: UserTeamResponseDto[];
}
