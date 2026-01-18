import { Injectable } from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ITeamsRepository } from './teams.repository';
import { PatchBodyTeamsDto } from '../dto/patch';

@Injectable()
export class PrismaTeamsRepository extends ITeamsRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async addUserToTeam(
    teamId: string,
    userId: string,
    year: number,
  ): Promise<any> {
    const user = await this.prisma.organizationMember.findFirst({
      where: { OR: [{ id: userId }, { azureId: userId }] },
    });

    const result = await this.prisma.team.update({
      where: { id: teamId },
      data: { users: { connect: { id: user.id } } },
      include: {
        company: true,
        users: { include: { stats: { where: { year }, take: 1 } } },
      },
    });

    return {
      ...result,
      users: result.users.map((user) => ({
        ...user,
        stats: user.stats[0] || null,
      })),
    };
  }

  async findAll(): Promise<Team[]> {
    return this.prisma.team.findMany({
      include: { company: true, users: true },
    });
  }

  async findById(id: string): Promise<Team | null> {
    return this.prisma.team.findUnique({
      where: { id },
      include: { company: true, users: true },
    });
  }

  async findByName(name: string): Promise<Team | null> {
    return this.prisma.team.findFirst({
      where: { name },
      include: { company: true, users: true },
    });
  }

  async findByCompanyId(companyId: string): Promise<Team[]> {
    return this.prisma.team.findMany({
      where: { companyId },
      include: { company: true, users: true },
    });
  }

  async create(data: Prisma.TeamCreateInput): Promise<Team> {
    return this.prisma.team.create({
      data,
      include: { company: true, users: true },
    });
  }

  async update(id: string, data: PatchBodyTeamsDto): Promise<any> {
    return this.prisma.team.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Team> {
    return this.prisma.team.delete({ where: { id } });
  }

  async deleteUserFromTeam(teamId: string, userId: string): Promise<void> {
    await this.prisma.team.update({
      where: { id: teamId },
      data: { users: { disconnect: { id: userId } } },
    });
  }
}
