import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Company } from '@prisma/client';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ICompaniesRepository } from './repositories/companies.repository';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: ICompaniesRepository) {}

  async findAll(): Promise<Company[]> {
    return this.companiesRepository.findAll();
  }

  async findById(id: string): Promise<Company> {
    const company = await this.companiesRepository.findById(id);
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const existingCompany = await this.companiesRepository.findByName(
      createCompanyDto.name,
    );
    if (existingCompany) {
      throw new ConflictException(
        `Company with name '${createCompanyDto.name}' already exists`,
      );
    }

    return this.companiesRepository.create(createCompanyDto);
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.findById(id);

    if (updateCompanyDto.name && updateCompanyDto.name !== company.name) {
      const existingCompany = await this.companiesRepository.findByName(
        updateCompanyDto.name,
      );
      if (existingCompany && existingCompany.id !== id) {
        throw new ConflictException(
          `Company with name '${updateCompanyDto.name}' already exists`,
        );
      }
    }

    return this.companiesRepository.update(id, updateCompanyDto);
  }

  async remove(id: string): Promise<Company> {
    await this.findById(id);
    return this.companiesRepository.delete(id);
  }
}
