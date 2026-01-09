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
import {
  PostBodyCompaniesOrganizationMembersDto,
  PostBodyCompaniesTeamDto,
  PostResponseCompaniesDto,
} from './dto';
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

  @Get(':id/teams')
  @ApiOperation({ summary: 'Get teams by Company ID' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiResponse({
    status: 200,
    description: 'List of teams for the specified company',
    // type: GetCompaniesTeamsDto,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async findTeamsByCompanyId(@Param('id') companyId: string): Promise<any[]> {
    return this.companiesService.findTeamsByCompanyId(companyId);
  }

  @Post(':id/teams')
  @ApiOperation({ summary: 'Create a new team for a specific company' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiResponse({
    status: 201,
    description: 'Team created successfully',
    // type: PostResponseTeamsDto,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async createTeamForCompany(
    @Param('id') companyId: string,
    @Body() body: PostBodyCompaniesTeamDto,
  ): Promise<any> {
    return this.companiesService.createTeamForCompany(companyId, body);
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
    @Body() postBodyCompaniesDto: PostBodyCompaniesDto,
  ): Promise<PostResponseCompaniesDto> {
    return this.companiesService.create(postBodyCompaniesDto);
  }

  @Post(':id/organization-members')
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiOperation({
    summary: 'Create new Organization Members on some specific company',
  })
  @ApiResponse({
    status: 201,
    description: 'Organization Members created successfully',
    type: PostResponseCompaniesDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Organization Members already exist',
  })
  async createOrganizationMembers(
    @Param('id') companyId: string,
    @Body()
    postBodyCompaniesOrganizationMembersDto: PostBodyCompaniesOrganizationMembersDto,
  ): Promise<any> {
    return this.companiesService.createOrganizationMembers(
      companyId,
      postBodyCompaniesOrganizationMembersDto,
    );
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
    @Body() putBodyCompaniesDto: PutBodyCompaniesDto,
  ): Promise<GetCompaniesDto> {
    return this.companiesService.update(id, putBodyCompaniesDto);
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
