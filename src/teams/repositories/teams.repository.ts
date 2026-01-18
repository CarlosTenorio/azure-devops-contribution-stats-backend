import { Prisma, Team } from '@prisma/client';
import { PatchBodyTeamsDto } from '../dto/patch';

export abstract class ITeamsRepository {
  abstract addUserToTeam(
    teamId: string,
    userId: string,
    year: number,
  ): Promise<Team>;
  abstract findAll(): Promise<Team[]>;
  abstract findById(id: string): Promise<Team | null>;
  abstract findByName(name: string): Promise<Team | null>;
  abstract findByCompanyId(companyId: string): Promise<Team[]>;
  abstract create(data: Prisma.TeamCreateInput): Promise<Team>;
  abstract update(id: string, data: PatchBodyTeamsDto): Promise<any>;
  abstract delete(id: string): Promise<Team>;
  abstract deleteUserFromTeam(teamId: string, userId: string): Promise<void>;
}
