import { Injectable } from '@nestjs/common';
import { Company, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { GetCompanyDto, PostBodyCompaniesOrganizationMembersDto } from '../dto';
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

  async createOrganizationMembers(
    companyId: string,
    data: PostBodyCompaniesOrganizationMembersDto,
  ): Promise<any> {
    const createManyData = data.members.map((member) => ({
      azureId: member.azureId,
      displayName: member.displayName,
      uniqueName: member.uniqueName,
      imageUrl: member.imageUrl,
      companyId,
    }));

    // Process in smaller batches to reduce deadlock probability
    const batchSize = 50;
    const results = [];

    for (let i = 0; i < createManyData.length; i += batchSize) {
      const batch = createManyData.slice(i, i + batchSize);

      const result = await this.executeWithRetry(async () => {
        return this.prisma.$transaction(
          async (tx) => {
            return tx.organizationMember.createMany({
              data: batch,
              skipDuplicates: true,
            });
          },
          { maxWait: 5000, timeout: 10000 },
        );
      });

      results.push(result);
    }

    return {
      count: results.reduce((sum, result) => sum + result.count, 0),
    };
  }

  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 100,
  ): Promise<T> {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        // Check if it's a deadlock error
        const isDeadlock =
          error?.code === 'P2034' ||
          error?.message?.includes('deadlock detected') ||
          error?.message?.includes('40P01');

        if (isDeadlock && attempt < maxRetries) {
          // Exponential backoff with jitter
          const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 100;
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
        throw error;
      }
    }
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
