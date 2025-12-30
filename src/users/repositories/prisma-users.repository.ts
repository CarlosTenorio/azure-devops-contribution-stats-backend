import { Injectable } from '@nestjs/common';
import { Prisma, User, UserStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { IUsersRepository } from './users.repository';
import { GetResponseUserDto } from '../dto';

@Injectable()
export class PrismaUsersRepository extends IUsersRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll(): Promise<any[]> {
    return this.prisma.user.findMany({
      include: { team: true },
    });
  }

  async findById(id: string): Promise<GetResponseUserDto | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { team: true, companyOwner: true },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { team: true },
    });
  }

  async findByTeamId(teamId: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { teamId },
      include: { team: true },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    console.log({ data });
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async updateStatus(id: string, status: UserStatus): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: { status } });
  }
}
