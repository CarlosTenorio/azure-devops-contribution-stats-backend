import { Company, Prisma } from '@prisma/client';
import {
  GetCompanyDto,
  PostBodyCompaniesDto,
  PostBodyCompaniesOrganizationMembersDto,
  PostBodyCompaniesTeamDto,
  PostResponseCompaniesOrganizationMembersDto,
} from '../dto';

export abstract class ICompaniesRepository {
  abstract findAll(): Promise<GetCompanyDto[]>;
  abstract findById(id: string, year?: number): Promise<GetCompanyDto | null>;
  abstract findByName(name: string): Promise<GetCompanyDto | null>;
  abstract findByOwnerId(ownerId: string): Promise<GetCompanyDto | null>;
  abstract findTeamsByCompanyId(companyId: string): Promise<any[]>;
  abstract create(data: PostBodyCompaniesDto): Promise<Company>;
  abstract createOrganizationMembers(
    companyId: string,
    data: PostBodyCompaniesOrganizationMembersDto,
  ): Promise<PostResponseCompaniesOrganizationMembersDto>;
  abstract createTeamForCompany(
    companyId: string,
    data: PostBodyCompaniesTeamDto,
  ): Promise<any>;
  abstract update(
    id: string,
    data: Prisma.CompanyUpdateInput,
  ): Promise<GetCompanyDto>;
  abstract delete(id: string): Promise<Company>;
}
