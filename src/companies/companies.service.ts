import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Company } from '@prisma/client';
import { GetCompanyDto } from './dto';
import { PostBodyCompaniesDto } from './dto/post/post-body-companies.dto';
import { PutBodyCompaniesDto } from './dto/put-body-companies.dto';
import { ICompaniesRepository } from './repositories/companies.repository';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: ICompaniesRepository) {}

  async findAll(): Promise<GetCompanyDto[]> {
    return this.companiesRepository.findAll();
  }

  async findById(id: string): Promise<GetCompanyDto> {
    const company = await this.companiesRepository.findById(id);
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
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

  async update(
    id: string,
    putBodyCompaniesDto: PutBodyCompaniesDto,
  ): Promise<Company> {
    const company = await this.findById(id);

    if (putBodyCompaniesDto.name && putBodyCompaniesDto.name !== company.name) {
      const existingCompany = await this.companiesRepository.findByName(
        putBodyCompaniesDto.name,
      );
      if (existingCompany && existingCompany.id !== id) {
        throw new ConflictException(
          `Company with name '${putBodyCompaniesDto.name}' already exists`,
        );
      }
    }

    return this.companiesRepository.update(id, putBodyCompaniesDto);
  }

  async remove(id: string): Promise<Company> {
    await this.findById(id);
    return this.companiesRepository.delete(id);
  }
}
