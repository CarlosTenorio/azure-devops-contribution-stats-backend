import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { PostResponseCompaniesDto } from './dto';
import { GetCompaniesDto } from './dto/detailed-company-response.dto';
import { PostBodyCompaniesDto } from './dto/post/post-body-companies.dto';
import { PutBodyCompaniesDto } from './dto/put-body-companies.dto';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

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

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({
    status: 201,
    description: 'Company created successfully',
    type: PostResponseCompaniesDto,
  })
  @ApiResponse({ status: 409, description: 'Company already exists' })
  async create(
    @Body() PostBodyCompaniesDto: PostBodyCompaniesDto,
  ): Promise<PostResponseCompaniesDto> {
    return this.companiesService.create(PostBodyCompaniesDto);
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
