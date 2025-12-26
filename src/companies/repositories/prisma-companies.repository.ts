import { Injectable } from '@nestjs/common';
import { Prisma, Company } from 'src/prisma/generated/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ICompaniesRepository } from './companies.repository';

@Injectable()
export class PrismaCompaniesRepository extends ICompaniesRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll(): Promise<Company[]> {
    return this.prisma.company.findMany({
      include: { users: true, teams: true },
    });
  }

  async findById(id: string): Promise<Company | null> {
    return this.prisma.company.findUnique({
      where: { id },
      include: { users: true, teams: true },
    });
  }

  async findByName(name: string): Promise<Company | null> {
    return this.prisma.company.findFirst({
      where: { name },
      include: { users: true, teams: true },
    });
  }

  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.prisma.company.create({
      data,
      include: { users: true, teams: true },
    });
  }

  async update(id: string, data: Prisma.CompanyUpdateInput): Promise<Company> {
    return this.prisma.company.update({
      where: { id },
      data,
      include: { users: true, teams: true },
    });
  }

  async delete(id: string): Promise<Company> {
    return this.prisma.company.delete({ where: { id } });
  }
}
