import { OrganizationMember, Prisma } from '@prisma/client';
import { PostBodyOrganizationMemberYearlyStatsDto } from '../dto/post';
import { PutBodyOrganizationMemberYearlyStatsDto } from '../dto/put';

export abstract class IOrganizationMemberRepository {
  abstract findAll(): Promise<OrganizationMember[]>;
  abstract findById(id: string): Promise<OrganizationMember | null>;
  abstract findByAzureId(azureId: string): Promise<OrganizationMember | null>;
  abstract findByUniqueName(
    uniqueName: string,
  ): Promise<OrganizationMember | null>;
  abstract findByCompanyId(companyId: string): Promise<OrganizationMember[]>;
  abstract create(
    data: Prisma.OrganizationMemberCreateInput,
  ): Promise<OrganizationMember>;
  abstract createYearlyStats(
    organizationMemberId: string,
    createStatsDto: PostBodyOrganizationMemberYearlyStatsDto,
    year: number,
  ): Promise<any>;
  abstract update(id: string, data: any): Promise<OrganizationMember>;
  abstract updateYearlyStats(
    organizationMemberId: string,
    year: number,
    updateStatsDto: PutBodyOrganizationMemberYearlyStatsDto,
  ): Promise<any>;
  abstract delete(id: string): Promise<OrganizationMember>;
}
