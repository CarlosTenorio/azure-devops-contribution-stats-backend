import { Injectable } from '@nestjs/common';
import { OrganizationMember, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { PostBodyOrganizationMemberYearlyStatsDto } from '../dto/post';
import { PutBodyOrganizationMemberYearlyStatsDto } from '../dto/put';
import { IOrganizationMemberRepository } from './organization-member.repository';

@Injectable()
export class PrismaOrganizationMemberRepository implements IOrganizationMemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.OrganizationMemberCreateInput,
  ): Promise<OrganizationMember> {
    return this.prisma.organizationMember.create({
      data,
      include: { company: true, teams: true },
    });
  }

  async createYearlyStats(
    organizationMemberId: string,
    createStatsDto: PostBodyOrganizationMemberYearlyStatsDto,
    year: number,
  ): Promise<any> {
    return this.prisma.yearlyStats.create({
      data: {
        organizationMember: { connect: { id: organizationMemberId } },
        year: year,
        commentsRatePerPRPercent: createStatsDto.commentsRatePerPRPercent,
        prCommentsMade: createStatsDto.prCommentsMade,
        prsClosed: createStatsDto.prsClosed,
        prsReviewed: createStatsDto.prsReviewed,
        workItemsAssigned: createStatsDto.workItemsAssigned,
        workItemsCreated: createStatsDto.workItemsCreated,
      },
    });
  }

  async findAll(): Promise<OrganizationMember[]> {
    const result = await this.prisma.organizationMember.findMany({
      include: {
        company: true,
        teams: true,
        stats: { include: { pullRequests: true } },
      },
    });

    return result.map((member) => ({
      ...member,
      stats: member.stats.map((stat) => ({
        ...stat,
        reposMostActive:
          typeof stat.reposMostActive === 'string'
            ? JSON.parse(stat.reposMostActive)
            : stat.reposMostActive,
      })),
    }));
  }

  async findById(id: string, year?: number): Promise<any | null> {
    const result = await this.prisma.organizationMember.findFirst({
      where: { OR: [{ id }, { azureId: id }] },
      include: {
        company: true,
        teams: true,
        stats: {
          where: year ? { year } : undefined,
          include: { pullRequests: true },
        },
      },
    });

    if (result && result.stats) {
      result.stats = result.stats.map((stat) => ({
        ...stat,
        reposMostActive:
          typeof stat.reposMostActive === 'string'
            ? JSON.parse(stat.reposMostActive)
            : stat.reposMostActive,
      }));
    }

    return result;
  }

  async findByAzureId(azureId: string): Promise<OrganizationMember | null> {
    const result = await this.prisma.organizationMember.findUnique({
      where: { azureId },
      include: {
        company: true,
        teams: true,
        stats: { include: { pullRequests: true } },
      },
    });

    if (result && result.stats) {
      result.stats = result.stats.map((stat) => ({
        ...stat,
        reposMostActive:
          typeof stat.reposMostActive === 'string'
            ? JSON.parse(stat.reposMostActive)
            : stat.reposMostActive,
      }));
    }

    return result;
  }

  async findByUniqueName(
    uniqueName: string,
  ): Promise<OrganizationMember | null> {
    const result = await this.prisma.organizationMember.findUnique({
      where: { uniqueName },
      include: {
        company: true,
        teams: true,
        stats: { include: { pullRequests: true } },
      },
    });

    if (result && result.stats) {
      result.stats = result.stats.map((stat) => ({
        ...stat,
        reposMostActive:
          typeof stat.reposMostActive === 'string'
            ? JSON.parse(stat.reposMostActive)
            : stat.reposMostActive,
      }));
    }

    return result;
  }

  async findByCompanyId(companyId: string): Promise<OrganizationMember[]> {
    const result = await this.prisma.organizationMember.findMany({
      where: { companyId },
      include: {
        company: true,
        teams: true,
        stats: { include: { pullRequests: true } },
      },
    });

    return result.map((member) => ({
      ...member,
      stats: member.stats.map((stat) => ({
        ...stat,
        reposMostActive:
          typeof stat.reposMostActive === 'string'
            ? JSON.parse(stat.reposMostActive)
            : stat.reposMostActive,
      })),
    }));
  }

  async update(id: string, data: any): Promise<OrganizationMember> {
    return this.prisma.organizationMember.update({
      where: { id },
      data,
      include: {
        company: true,
        teams: true,
      },
    });
  }

  async updateYearlyStats(
    organizationMemberId: string,
    year: number,
    updateStatsDto: PutBodyOrganizationMemberYearlyStatsDto,
  ): Promise<any> {
    const organizationMember = await this.prisma.organizationMember.findFirst({
      where: {
        OR: [{ id: organizationMemberId }, { azureId: organizationMemberId }],
      },
    });

    if (!organizationMember) {
      throw new Error('Organization member not found');
    }

    return this.prisma.yearlyStats.upsert({
      where: {
        organizationMemberId_year: {
          organizationMemberId: organizationMember.id,
          year,
        },
      },
      create: {
        year: year,
        organizationMember: { connect: { id: organizationMember.id } },
        commentsRatePerPRPercent: updateStatsDto.commentsRatePerPRPercent,
        prCommentsMade: updateStatsDto.prCommentsMade,
        prsClosed: updateStatsDto.prsClosed,
        prsReviewed: updateStatsDto.prsReviewed,
        workItemsAssigned: updateStatsDto.workItemsAssigned,
        workItemsCreated: updateStatsDto.workItemsCreated,
        reposMostActive: JSON.stringify(updateStatsDto.reposMostActive),
        pullRequests: {
          create: updateStatsDto.pullRequests.map((pr) => ({
            closedDate: pr.closedDate,
            codeReviewAzureId: pr.codeReviewAzureId,
            pullRequestAzureId: pr.pullRequestAzureId,
            repositoryAzureId: pr.repositoryAzureId,
            repositoryName: pr.repositoryName,
            repositoryUrl: pr.repositoryUrl,
            status: pr.status,
            title: pr.title,
          })),
        },
      },
      update: {
        year: year,
        organizationMember: { connect: { id: organizationMember.id } },
        commentsRatePerPRPercent: updateStatsDto.commentsRatePerPRPercent,
        prCommentsMade: updateStatsDto.prCommentsMade,
        prsClosed: updateStatsDto.prsClosed,
        prsReviewed: updateStatsDto.prsReviewed,
        workItemsAssigned: updateStatsDto.workItemsAssigned,
        workItemsCreated: updateStatsDto.workItemsCreated,
        reposMostActive: JSON.stringify(updateStatsDto.reposMostActive),
        pullRequests: {
          deleteMany: {}, // Clear existing pull requests
          create: updateStatsDto.pullRequests.map((pr) => ({
            closedDate: pr.closedDate,
            codeReviewAzureId: pr.codeReviewAzureId,
            pullRequestAzureId: pr.pullRequestAzureId,
            repositoryAzureId: pr.repositoryAzureId,
            repositoryName: pr.repositoryName,
            repositoryUrl: pr.repositoryUrl,
            status: pr.status,
            title: pr.title,
          })),
        },
      },
      include: { pullRequests: true },
    });

    // if (
    //   updateStatsDto.pullRequests &&
    //   Array.isArray(updateStatsDto.pullRequests)
    // ) {
    //   for (const pr of updateStatsDto.pullRequests) {
    //     const existingPr = await this.prisma.pullRequest.findFirst({
    //       where: {
    //         pullRequestAzureId: pr.pullRequestAzureId,
    //         yearlyStatsId: yearlyStats.id,
    //       },
    //     });

    //     if (existingPr) {
    //       await this.prisma.pullRequest.update({
    //         where: { id: existingPr.id },
    //         data: {
    //           closedDate: pr.closedDate,
    //           codeReviewAzureId: pr.codeReviewAzureId,
    //           repositoryAzureId: pr.repositoryAzureId,
    //           repositoryName: pr.repositoryName,
    //           repositoryUrl: pr.repositoryUrl,
    //           status: pr.status,
    //           title: pr.title,
    //         },
    //       });
    //     } else {
    //       await this.prisma.pullRequest.create({
    //         data: {
    //           closedDate: pr.closedDate,
    //           codeReviewAzureId: pr.codeReviewAzureId,
    //           pullRequestAzureId: pr.pullRequestAzureId,
    //           repositoryAzureId: pr.repositoryAzureId,
    //           repositoryName: pr.repositoryName,
    //           repositoryUrl: pr.repositoryUrl,
    //           status: pr.status,
    //           title: pr.title,
    //           yearlyStatsId: yearlyStats.id,
    //         },
    //       });
    //     }
    //   }
    // }

    // return this.prisma.yearlyStats.update({
    //   where: { organizationMemberId_year: { organizationMemberId, year } },
    //   data: {
    //     commentsRatePerPRPercent: updateStatsDto.commentsRatePerPRPercent,
    //     prCommentsMade: updateStatsDto.prCommentsMade,
    //     prsClosed: updateStatsDto.prsClosed,
    //     prsReviewed: updateStatsDto.prsReviewed,
    //     workItemsAssigned: updateStatsDto.workItemsAssigned,
    //     workItemsCreated: updateStatsDto.workItemsCreated,
    //     reposMostActive: updateStatsDto.reposMostActive?.toString(),
    //   },
    //   include: { pullRequests: true },
    // });
  }

  async delete(id: string): Promise<OrganizationMember> {
    return this.prisma.organizationMember.delete({ where: { id } });
  }
}
