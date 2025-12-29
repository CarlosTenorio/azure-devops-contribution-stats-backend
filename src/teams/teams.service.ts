import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Team } from '@prisma/client';
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

  async update(id: string, updateTeamDto: any): Promise<Team> {
    const team = await this.findById(id);

    if (updateTeamDto.name && updateTeamDto.name !== team.name) {
      const existingTeam = await this.teamsRepository.findByName(
        updateTeamDto.name,
      );
      if (
        existingTeam &&
        existingTeam.id !== id &&
        existingTeam.companyId === (updateTeamDto.companyId || team.companyId)
      ) {
        throw new ConflictException(
          `Team with name '${updateTeamDto.name}' already exists in this company`,
        );
      }
    }

    const updateData: any = {};
    if (updateTeamDto.name) updateData.name = updateTeamDto.name;
    if (updateTeamDto.companyId) {
      updateData.company = { connect: { id: updateTeamDto.companyId } };
    }

    return this.teamsRepository.update(id, updateData);
  }

  async remove(id: string): Promise<Team> {
    await this.findById(id);
    return this.teamsRepository.delete(id);
  }
}
