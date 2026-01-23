import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Company } from '@prisma/client';
import {
  GetCompanyDto,
  PostBodyCompaniesOrganizationMembersDto,
  PostBodyCompaniesTeamDto,
} from './dto';
import { PostBodyCompaniesDto } from './dto/post/post-body-companies.dto';
import { PutBodyCompaniesDto } from './dto/put-body-companies.dto';
import { ICompaniesRepository } from './repositories/companies.repository';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: ICompaniesRepository) {}

  async findAll(): Promise<GetCompanyDto[]> {
    return this.companiesRepository.findAll();
  }

  async findById(id: string, year?: number): Promise<GetCompanyDto> {
    const company = await this.companiesRepository.findById(id, year);
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async findTeamsByCompanyId(companyId: string, year: number): Promise<any[]> {
    await this.findById(companyId, year);
    return this.companiesRepository.findTeamsByCompanyId(companyId);
  }

  async create(postBodyCompaniesDto: PostBodyCompaniesDto): Promise<Company> {
    const userAlreadyOwnsCompany = await this.companiesRepository.findByOwnerId(
      postBodyCompaniesDto.ownerUserId,
    );
    if (userAlreadyOwnsCompany) {
      throw new ConflictException(
        `User with ID '${postBodyCompaniesDto.ownerUserId}' already owns a company`,
      );
    }
    return this.companiesRepository.create(postBodyCompaniesDto);
  }

  async createOrganizationMembers(
    companyId: string,
    postBodyCompaniesOrganizationMembersDto: PostBodyCompaniesOrganizationMembersDto,
  ): Promise<any> {
    return this.companiesRepository.createOrganizationMembers(
      companyId,
      postBodyCompaniesOrganizationMembersDto,
    );
  }

  async createTeamForCompany(
    companyId: string,
    postBodyCompaniesTeamDto: PostBodyCompaniesTeamDto,
  ): Promise<any> {
    return this.companiesRepository.createTeamForCompany(
      companyId,
      postBodyCompaniesTeamDto,
    );
  }

  async update(
    id: string,
    putBodyCompaniesDto: PutBodyCompaniesDto,
  ): Promise<any> {
    return this.companiesRepository.update(id, putBodyCompaniesDto);
  }

  async remove(id: string): Promise<Company> {
    await this.findById(id);
    return this.companiesRepository.delete(id);
  }
}
