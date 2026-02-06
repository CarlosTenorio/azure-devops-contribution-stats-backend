import { Injectable } from '@nestjs/common';
import { Company, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import {
  GetCompanyDto,
  PostBodyCompaniesDto,
  PostBodyCompaniesOrganizationMembersDto,
  PostBodyCompaniesTeamDto,
  PostResponseCompaniesOrganizationMembersDto,
  TeamResponseDto,
} from '../dto';
import { UserTeamResponseDto } from '../dto/user-team-response.dto';
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
            expanded: team.expanded,
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
          minCommentsRatePerPRPercentToBeGoodReviewer:
            company.minCommentsRatePerPRPercentToBeGoodReviewer,
          minPRsClosedToBeGoodContributor:
            company.minPRsClosedToBeGoodContributor,
          minPrsReviewedToBeGoodReviewer:
            company.minPrsReviewedToBeGoodReviewer,
          minWorkItemsAssignedToBeGoodContributor:
            company.minWorkItemsAssignedToBeGoodContributor,
          minWorkItemsCreatedToBeGoodContributor:
            company.minWorkItemsCreatedToBeGoodContributor,
          projectURL: company.projectURL,
        },
    );
  }

  async findById(id: string, year: number): Promise<GetCompanyDto | null> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        teams: { include: { users: { include: { stats: true } } } },
        organizationMembers: true,
      },
    });

    return <GetCompanyDto>{
      createdAt: company.createdAt,
      id: company.id,
      name: company.name,
      teams: company.teams.map(
        (team) =>
          <TeamResponseDto>{
            id: team.id,
            name: team.name,
            createdAt: team.createdAt,
            updatedAt: team.updatedAt,
            expanded: team.expanded,
            users: team.users.map(
              (user) =>
                <UserTeamResponseDto>{
                  azureId: user.azureId,
                  displayName: user.displayName,
                  id: user.id,
                  imageUrl: user.imageUrl,
                  uniqueName: user.uniqueName,
                  yearStats: (() => {
                    const stat = user.stats.find((stat) => stat.year === year);
                    if (!stat) return null;
                    return {
                      ...stat,
                      reposMostActive:
                        typeof stat.reposMostActive === 'string'
                          ? (() => {
                              try {
                                return JSON.parse(stat.reposMostActive);
                              } catch (error) {
                                return null;
                              }
                            })()
                          : stat.reposMostActive,
                    };
                  })(),
                },
            ),
          },
      ),
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
      minCommentsRatePerPRPercentToBeGoodReviewer:
        company.minCommentsRatePerPRPercentToBeGoodReviewer,
      minPRsClosedToBeGoodContributor: company.minPRsClosedToBeGoodContributor,
      minPrsReviewedToBeGoodReviewer: company.minPrsReviewedToBeGoodReviewer,
      minWorkItemsAssignedToBeGoodContributor:
        company.minWorkItemsAssignedToBeGoodContributor,
      minWorkItemsCreatedToBeGoodContributor:
        company.minWorkItemsCreatedToBeGoodContributor,
      projectURL: company.projectURL,
    };
  }

  async findByName(name: string): Promise<GetCompanyDto | null> {
    const company = await this.prisma.company.findFirst({
      where: { name },
      include: {
        teams: { include: { users: true } },
        organizationMembers: true,
      },
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
        expanded: team.expanded,
        users: team.users.map((user) => ({
          azureId: user.azureId,
          displayName: user.displayName,
          id: user.id,
          imageUrl: user.imageUrl,
          uniqueName: user.uniqueName,
        })),
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
      minCommentsRatePerPRPercentToBeGoodReviewer:
        company.minCommentsRatePerPRPercentToBeGoodReviewer,
      minPRsClosedToBeGoodContributor: company.minPRsClosedToBeGoodContributor,
      minPrsReviewedToBeGoodReviewer: company.minPrsReviewedToBeGoodReviewer,
      minWorkItemsAssignedToBeGoodContributor:
        company.minWorkItemsAssignedToBeGoodContributor,
      minWorkItemsCreatedToBeGoodContributor:
        company.minWorkItemsCreatedToBeGoodContributor,
      projectURL: company.projectURL,
    };
  }

  async findByOwnerId(ownerUserId: string): Promise<GetCompanyDto | null> {
    const company = await this.prisma.company.findFirst({
      where: { ownerUserId },
      include: {
        teams: { include: { users: true } },
        organizationMembers: true,
      },
    });

    if (!company) {
      return null;
    }

    return <GetCompanyDto>{
      createdAt: company.createdAt,
      id: company.id,
      name: company.name,
      teams: company.teams.map(
        (team) =>
          <TeamResponseDto>{
            id: team.id,
            name: team.name,
            createdAt: team.createdAt,
            updatedAt: team.updatedAt,
            expanded: team.expanded,
            users: team.users.map(
              (user) =>
                <UserTeamResponseDto>{
                  azureId: user.azureId,
                  displayName: user.displayName,
                  id: user.id,
                  imageUrl: user.imageUrl,
                  uniqueName: user.uniqueName,
                },
            ),
          },
      ),
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
      minCommentsRatePerPRPercentToBeGoodReviewer:
        company.minCommentsRatePerPRPercentToBeGoodReviewer,
      minPRsClosedToBeGoodContributor: company.minPRsClosedToBeGoodContributor,
      minPrsReviewedToBeGoodReviewer: company.minPrsReviewedToBeGoodReviewer,
      minWorkItemsAssignedToBeGoodContributor:
        company.minWorkItemsAssignedToBeGoodContributor,
      minWorkItemsCreatedToBeGoodContributor:
        company.minWorkItemsCreatedToBeGoodContributor,
      projectURL: company.projectURL,
    };
  }

  async findTeamsByCompanyId(companyId: string): Promise<any[]> {
    const teams = await this.prisma.team.findMany({ where: { companyId } });
    return teams;
  }

  async create(data: PostBodyCompaniesDto): Promise<Company> {
    return this.prisma.company.create({
      data: { ...data, projectURL: data.projectURL ?? '' },
      include: { teams: true },
    });
  }

  async createOrganizationMembers(
    companyId: string,
    data: PostBodyCompaniesOrganizationMembersDto,
  ): Promise<PostResponseCompaniesOrganizationMembersDto> {
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

    const membersAdded = await this.prisma.organizationMember.findMany({
      where: {
        companyId,
        azureId: { in: data.members.map(({ azureId }) => azureId) },
      },
    });

    return { members: membersAdded };
  }

  async createTeamForCompany(
    companyId: string,
    data: PostBodyCompaniesTeamDto,
  ): Promise<any> {
    return this.prisma.team.create({ data: { ...data, companyId } });
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

  async update(
    id: string,
    data: Prisma.CompanyUpdateInput,
  ): Promise<GetCompanyDto> {
    const company = await this.prisma.company.update({
      where: { id },
      data,
      include: {
        teams: { include: { users: { include: { stats: true } } } },
        organizationMembers: true,
      },
    });

    return <GetCompanyDto>{
      createdAt: company.createdAt,
      id: company.id,
      name: company.name,
      teams: company.teams.map(
        (team) =>
          <TeamResponseDto>{
            id: team.id,
            name: team.name,
            createdAt: team.createdAt,
            updatedAt: team.updatedAt,
            expanded: team.expanded,
            users: team.users.map(
              (user) =>
                <UserTeamResponseDto>{
                  azureId: user.azureId,
                  displayName: user.displayName,
                  id: user.id,
                  imageUrl: user.imageUrl,
                  uniqueName: user.uniqueName,
                },
            ),
          },
      ),
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
      minCommentsRatePerPRPercentToBeGoodReviewer:
        company.minCommentsRatePerPRPercentToBeGoodReviewer,
      minPRsClosedToBeGoodContributor: company.minPRsClosedToBeGoodContributor,
      minPrsReviewedToBeGoodReviewer: company.minPrsReviewedToBeGoodReviewer,
      minWorkItemsAssignedToBeGoodContributor:
        company.minWorkItemsAssignedToBeGoodContributor,
      minWorkItemsCreatedToBeGoodContributor:
        company.minWorkItemsCreatedToBeGoodContributor,
      projectURL: company.projectURL,
    };
  }

  async delete(id: string): Promise<Company> {
    return this.prisma.company.delete({ where: { id } });
  }
}
