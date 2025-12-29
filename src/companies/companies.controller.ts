import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { PostBodyCompaniesDto } from './dto/post-body-companies.dto';
import { PutBodyCompaniesDto } from './dto/put-body-companies.dto';
import { GetCompaniesDto } from './dto/get-companies.dto';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({
    status: 201,
    description: 'Company created successfully',
    type: GetCompaniesDto,
  })
  @ApiResponse({ status: 409, description: 'Company name already exists' })
  async create(
    @Body() PostBodyCompaniesDto: PostBodyCompaniesDto,
  ): Promise<GetCompaniesDto> {
    return this.companiesService.create(PostBodyCompaniesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({
    status: 200,
    description: 'List of all companies',
    type: [GetCompaniesDto],
  })
  async findAll(): Promise<GetCompaniesDto[]> {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiResponse({
    status: 200,
    description: 'Company found',
    type: GetCompaniesDto,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async findOne(@Param('id') id: string): Promise<GetCompaniesDto> {
    return this.companiesService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiResponse({
    status: 200,
    description: 'Company updated successfully',
    type: GetCompaniesDto,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiResponse({ status: 409, description: 'Company name already exists' })
  async update(
    @Param('id') id: string,
    @Body() PutBodyCompaniesDto: PutBodyCompaniesDto,
  ): Promise<GetCompaniesDto> {
    return this.companiesService.update(id, PutBodyCompaniesDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiResponse({ status: 204, description: 'Company deleted successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.companiesService.remove(id);
  }
}
