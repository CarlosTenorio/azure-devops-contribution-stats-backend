import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrganizationMember } from '@prisma/client';
import { StatsService } from '../stats/stats.service';
import { PatchBodyOrganizationMemberDto } from './dto/patch/patch-body-organization-member.dto';
import { PostBodyOrganizationMemberYearlyStatsDto } from './dto/post';
import { IOrganizationMemberRepository } from './repositories/organization-member.repository';
import { PutBodyOrganizationMemberYearlyStatsDto } from './dto/put';

@Injectable()
export class OrganizationMemberService {
  constructor(
    private readonly organizationMemberRepository: IOrganizationMemberRepository,
    private readonly statsService: StatsService,
  ) {}

  async findAll(): Promise<OrganizationMember[]> {
    return this.organizationMemberRepository.findAll();
  }

  async findById(id: string): Promise<OrganizationMember> {
    const organizationMember =
      await this.organizationMemberRepository.findById(id);
    if (!organizationMember) {
      throw new NotFoundException(
        `Organization member with ID ${id} not found`,
      );
    }
    return organizationMember;
  }

  async findByCompanyId(companyId: string): Promise<OrganizationMember[]> {
    return this.organizationMemberRepository.findByCompanyId(companyId);
  }

  async create(createOrgMemberDto: any): Promise<OrganizationMember> {
    // Check if organization member with the same azureId already exists
    const existingByAzureId =
      await this.organizationMemberRepository.findByAzureId(
        createOrgMemberDto.azureId,
      );
    if (existingByAzureId) {
      throw new ConflictException(
        `Organization member with azureId '${createOrgMemberDto.azureId}' already exists`,
      );
    }

    // Check if organization member with the same uniqueName already exists
    const existingByUniqueName =
      await this.organizationMemberRepository.findByUniqueName(
        createOrgMemberDto.uniqueName,
      );
    if (existingByUniqueName) {
      throw new ConflictException(
        `Organization member with uniqueName '${createOrgMemberDto.uniqueName}' already exists`,
      );
    }

    const createData: any = {
      azureId: createOrgMemberDto.azureId,
      displayName: createOrgMemberDto.displayName,
      uniqueName: createOrgMemberDto.uniqueName,
    };

    if (createOrgMemberDto.imageUrl) {
      createData.imageUrl = createOrgMemberDto.imageUrl;
    }

    if (createOrgMemberDto.companyId) {
      createData.company = {
        connect: { id: createOrgMemberDto.companyId },
      };
    }

    return this.organizationMemberRepository.create(createData);
  }

  async update(
    id: string,
    updateOrgMemberDto: PatchBodyOrganizationMemberDto,
  ): Promise<OrganizationMember> {
    const organizationMember = await this.findById(id);

    // Check if azureId is being updated and if it conflicts
    if (
      updateOrgMemberDto.azureId &&
      updateOrgMemberDto.azureId !== organizationMember.azureId
    ) {
      const existingByAzureId =
        await this.organizationMemberRepository.findByAzureId(
          updateOrgMemberDto.azureId,
        );
      if (existingByAzureId && existingByAzureId.id !== id) {
        throw new ConflictException(
          `Organization member with azureId '${updateOrgMemberDto.azureId}' already exists`,
        );
      }
    }

    // Check if uniqueName is being updated and if it conflicts
    if (
      updateOrgMemberDto.uniqueName &&
      updateOrgMemberDto.uniqueName !== organizationMember.uniqueName
    ) {
      const existingByUniqueName =
        await this.organizationMemberRepository.findByUniqueName(
          updateOrgMemberDto.uniqueName,
        );
      if (existingByUniqueName && existingByUniqueName.id !== id) {
        throw new ConflictException(
          `Organization member with uniqueName '${updateOrgMemberDto.uniqueName}' already exists`,
        );
      }
    }

    const updateData: any = {};
    if (updateOrgMemberDto.azureId) {
      updateData.azureId = updateOrgMemberDto.azureId;
    }
    if (updateOrgMemberDto.displayName) {
      updateData.displayName = updateOrgMemberDto.displayName;
    }
    if (updateOrgMemberDto.uniqueName) {
      updateData.uniqueName = updateOrgMemberDto.uniqueName;
    }
    if (updateOrgMemberDto.imageUrl !== undefined) {
      updateData.imageUrl = updateOrgMemberDto.imageUrl;
    }
    if (updateOrgMemberDto.companyId) {
      updateData.company = {
        connect: { id: updateOrgMemberDto.companyId },
      };
    }

    return this.organizationMemberRepository.update(id, updateData);
  }

  async updateYearlyStats(
    id: string,
    year: string,
    updateStatsDto: PutBodyOrganizationMemberYearlyStatsDto,
  ): Promise<any> {
    const numberYear = parseInt(year);
    return this.organizationMemberRepository.updateYearlyStats(
      id,
      numberYear,
      updateStatsDto,
    );
  }

  async remove(id: string): Promise<OrganizationMember> {
    await this.findById(id);
    return this.organizationMemberRepository.delete(id);
  }

  async getYearlyStats(id: string, year?: number): Promise<any> {
    // First ensure the organization member exists
    const organizationMember = await this.findById(id);

    // For now, we'll return a placeholder response since OrganizationMember doesn't have stats
    // This could be extended in the future to aggregate stats from related users or implement
    // a separate stats system for organization members

    const response = {
      organizationMemberId: id,
      organizationMember: {
        id: organizationMember.id,
        displayName: organizationMember.displayName,
        uniqueName: organizationMember.uniqueName,
        azureId: organizationMember.azureId,
      },
      year: year || new Date().getFullYear(),
      stats: {
        // Placeholder stats - can be replaced with actual implementation
        commentsRatePerPRPercent: 0,
        prCommentsMade: 0,
        prsClosed: 0,
        prsReviewed: 0,
        workItemsAssigned: 0,
        workItemsCreated: 0,
        reposMostActive: [],
        pullRequests: [],
      },
    };

    return response;
  }

  async createYearlyStats(
    id: string,
    createStatsDto: PostBodyOrganizationMemberYearlyStatsDto,
    year: string,
  ): Promise<any> {
    const numberYear = parseInt(year);
    const organizationMember = await this.findById(id);
    return this.organizationMemberRepository.createYearlyStats(
      organizationMember.id,
      createStatsDto,
      numberYear,
    );
  }
}
