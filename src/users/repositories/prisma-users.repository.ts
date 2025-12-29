import { Injectable } from '@nestjs/common';
import { Prisma, User, UserStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserResponseDto } from '../dto';
import { IUsersRepository } from './users.repository';

@Injectable()
export class PrismaUsersRepository extends IUsersRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll(): Promise<any[]> {
    return this.prisma.user.findMany({
      include: { company: true, team: true, stats: true },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { company: true, team: true, stats: true },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { company: true, team: true, stats: true },
    });
  }

  async findByCompanyId(companyId: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { companyId },
      include: { company: true, team: true, stats: true },
    });
  }

  async findByTeamId(teamId: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { teamId },
      include: { company: true, team: true, stats: true },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
      include: { company: true, team: true, stats: true },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: { company: true, team: true, stats: true },
    });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async updateStatus(id: string, status: UserStatus): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { status },
      include: { company: true, team: true, stats: true },
    });
  }
}
