import { Injectable } from '@nestjs/common';
import { Prisma, User, UserStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { GetResponseUserDto } from '../dto';
import { IUsersRepository } from './users.repository';

@Injectable()
export class PrismaUsersRepository extends IUsersRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll(): Promise<any[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<GetResponseUserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        companyOwner: {
          select: { id: true, name: true, createdAt: true, updatedAt: true },
        },
      },
    });
    const companyWhereComesInvitation = await this.prisma.invitation.findFirst({
      where: { email: user?.email },
      include: {
        company: {
          select: { id: true, name: true, createdAt: true, updatedAt: true },
        },
      },
    });
    return {
      ...user,
      companyWhereComesInvitation: companyWhereComesInvitation?.company || null,
    };
  }

  async findByEmail(email: string): Promise<GetResponseUserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        companyOwner: {
          select: { id: true, name: true, createdAt: true, updatedAt: true },
        },
      },
    });
    const companyWhereComesInvitation = await this.prisma.invitation.findFirst({
      where: { email: user?.email },
      include: {
        company: {
          select: { id: true, name: true, createdAt: true, updatedAt: true },
        },
      },
    });

    return {
      ...user,
      companyWhereComesInvitation: companyWhereComesInvitation?.company || null,
    };
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
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
