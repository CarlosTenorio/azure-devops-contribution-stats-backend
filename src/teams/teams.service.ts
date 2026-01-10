import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Team } from '@prisma/client';
import { PatchBodyTeamsDto } from './dto/patch';
import { ITeamsRepository } from './repositories/teams.repository';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: ITeamsRepository) {}

  async findAll(): Promise<Team[]> {
    return this.teamsRepository.findAll();
  }

  async findById(id: string): Promise<Team> {
    const team = await this.teamsRepository.findById(id);
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async findByCompanyId(companyId: string): Promise<Team[]> {
    return this.teamsRepository.findByCompanyId(companyId);
  }

  async create(createTeamDto: any): Promise<Team> {
    const existingTeam = await this.teamsRepository.findByName(
      createTeamDto.name,
    );
    if (existingTeam && existingTeam.companyId === createTeamDto.companyId) {
      throw new ConflictException(
        `Team with name '${createTeamDto.name}' already exists in this company`,
      );
    }

    return this.teamsRepository.create({
      name: createTeamDto.name,
      company: {
        connect: { id: createTeamDto.companyId },
      },
    });
  }

  async update(
    teamId: string,
    updateTeamDto: PatchBodyTeamsDto,
  ): Promise<Team> {
    const team = await this.findById(teamId);

    if (updateTeamDto.name && updateTeamDto.name !== team.name) {
      const existingTeam = await this.teamsRepository.findByName(
        updateTeamDto.name,
      );
      if (existingTeam && existingTeam.id !== teamId) {
        throw new ConflictException(
          `Team with name '${updateTeamDto.name}' already exists in this company`,
        );
      }
    }

    const updateData: any = {};
    if (updateTeamDto.name) {
      updateData.name = updateTeamDto.name;
    }
    if (updateTeamDto.expanded !== undefined) {
      updateData.expanded = updateTeamDto.expanded;
    }

    return this.teamsRepository.update(teamId, updateData);
  }

  async remove(id: string): Promise<Team> {
    await this.findById(id);
    return this.teamsRepository.delete(id);
  }
}
