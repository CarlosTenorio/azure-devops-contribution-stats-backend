import { Company, Prisma } from '@prisma/client';
import { GetCompanyDto } from '../dto';

export abstract class ICompaniesRepository {
  abstract findAll(): Promise<GetCompanyDto[]>;
  abstract findById(id: string): Promise<GetCompanyDto | null>;
  abstract findByName(name: string): Promise<GetCompanyDto | null>;
  abstract findByOwnerId(ownerId: string): Promise<GetCompanyDto | null>;
  abstract create(data: Prisma.CompanyCreateInput): Promise<Company>;
  abstract update(
    id: string,
    data: Prisma.CompanyUpdateInput,
  ): Promise<Company>;
  abstract delete(id: string): Promise<Company>;
}
