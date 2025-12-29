import { Injectable } from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ITeamsRepository } from './teams.repository';

@Injectable()
export class PrismaTeamsRepository extends ITeamsRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
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

  async update(id: string, data: Prisma.TeamUpdateInput): Promise<Team> {
    return this.prisma.team.update({
      where: { id },
      data,
      include: { company: true, users: true },
    });
  }

  async delete(id: string): Promise<Team> {
    return this.prisma.team.delete({ where: { id } });
  }
}
