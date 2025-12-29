import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Company } from '@prisma/client';
import { PostBodyCompaniesDto } from './dto/post-body-companies.dto';
import { PutBodyCompaniesDto } from './dto/put-body-companies.dto';
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

  async create(PostBodyCompaniesDto: PostBodyCompaniesDto): Promise<Company> {
    const existingCompany = await this.companiesRepository.findByName(
      PostBodyCompaniesDto.name,
    );
    if (existingCompany) {
      throw new ConflictException(
        `Company with name '${PostBodyCompaniesDto.name}' already exists`,
      );
    }

    return this.companiesRepository.create(PostBodyCompaniesDto);
  }

  async update(
    id: string,
    PutBodyCompaniesDto: PutBodyCompaniesDto,
  ): Promise<Company> {
    const company = await this.findById(id);

    if (PutBodyCompaniesDto.name && PutBodyCompaniesDto.name !== company.name) {
      const existingCompany = await this.companiesRepository.findByName(
        PutBodyCompaniesDto.name,
      );
      if (existingCompany && existingCompany.id !== id) {
        throw new ConflictException(
          `Company with name '${PutBodyCompaniesDto.name}' already exists`,
        );
      }
    }

    return this.companiesRepository.update(id, PutBodyCompaniesDto);
  }

  async remove(id: string): Promise<Company> {
    await this.findById(id);
    return this.companiesRepository.delete(id);
  }
}
