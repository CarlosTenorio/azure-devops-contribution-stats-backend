import { Injectable } from '@nestjs/common';
import { Company, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { GetCompanyDto } from '../dto';
import { ICompaniesRepository } from './companies.repository';

@Injectable()
export class PrismaCompaniesRepository extends ICompaniesRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll(): Promise<GetCompanyDto[]> {
    const companies = await this.prisma.company.findMany({
      include: { teams: true, organizationMembers: true },
    });
    return companies.map(
      (company) =>
        <GetCompanyDto>{
          createdAt: company.createdAt,
          id: company.id,
          name: company.name,
          teams: company.teams.map((team) => ({
            id: team.id,
            name: team.name,
            createdAt: team.createdAt,
            updatedAt: team.updatedAt,
          })),
          organizationMembers: company.organizationMembers.map((member) => ({
            id: member.id,
            azureId: member.azureId,
            email: member.email,
            displayName: member.displayName,
            uniqueName: member.uniqueName,
            imageUrl: member.imageUrl,
            createdAt: member.createdAt,
            updatedAt: member.updatedAt,
          })),
          updatedAt: company.updatedAt,
        },
    );
  }

  async findById(id: string): Promise<GetCompanyDto | null> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: { teams: true, organizationMembers: true },
    });
    return <GetCompanyDto>{
      createdAt: company.createdAt,
      id: company.id,
      name: company.name,
      teams: company.teams.map((team) => ({
        id: team.id,
        name: team.name,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
      })),
      organizationMembers: company.organizationMembers.map((member) => ({
        id: member.id,
        azureId: member.azureId,
        email: member.email,
        displayName: member.displayName,
        uniqueName: member.uniqueName,
        imageUrl: member.imageUrl,
        createdAt: member.createdAt,
        updatedAt: member.updatedAt,
      })),
      updatedAt: company.updatedAt,
    };
  }

  async findByName(name: string): Promise<GetCompanyDto | null> {
    const company = await this.prisma.company.findFirst({
      where: { name },
      include: { teams: true, organizationMembers: true },
    });
    return <GetCompanyDto>{
      createdAt: company.createdAt,
      id: company.id,
      name: company.name,
      teams: company.teams.map((team) => ({
        id: team.id,
        name: team.name,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
      })),
      organizationMembers: company.organizationMembers.map((member) => ({
        id: member.id,
        azureId: member.azureId,
        email: member.email,
        displayName: member.displayName,
        uniqueName: member.uniqueName,
        imageUrl: member.imageUrl,
        createdAt: member.createdAt,
        updatedAt: member.updatedAt,
      })),
      updatedAt: company.updatedAt,
    };
  }

  async findByOwnerId(ownerUserId: string): Promise<GetCompanyDto | null> {
    const company = await this.prisma.company.findFirst({
      where: { ownerUserId },
      include: { teams: true, organizationMembers: true },
    });
    return <GetCompanyDto>{
      createdAt: company.createdAt,
      id: company.id,
      name: company.name,
      teams: company.teams.map((team) => ({
        id: team.id,
        name: team.name,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
      })),
      organizationMembers: company.organizationMembers.map((member) => ({
        id: member.id,
        azureId: member.azureId,
        email: member.email,
        displayName: member.displayName,
        uniqueName: member.uniqueName,
        imageUrl: member.imageUrl,
        createdAt: member.createdAt,
        updatedAt: member.updatedAt,
      })),
      updatedAt: company.updatedAt,
    };
  }

  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.prisma.company.create({ data, include: { teams: true } });
  }

  async update(id: string, data: Prisma.CompanyUpdateInput): Promise<Company> {
    return this.prisma.company.update({
      where: { id },
      data,
      include: { teams: true },
    });
  }

  async delete(id: string): Promise<Company> {
    return this.prisma.company.delete({ where: { id } });
  }
}
