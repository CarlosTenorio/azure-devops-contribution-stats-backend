import { Prisma, Company } from 'src/prisma/generated/client';

export abstract class ICompaniesRepository {
  abstract findAll(): Promise<Company[]>;
  abstract findById(id: string): Promise<Company | null>;
  abstract findByName(name: string): Promise<Company | null>;
  abstract create(data: Prisma.CompanyCreateInput): Promise<Company>;
  abstract update(
    id: string,
    data: Prisma.CompanyUpdateInput,
  ): Promise<Company>;
  abstract delete(id: string): Promise<Company>;
}
