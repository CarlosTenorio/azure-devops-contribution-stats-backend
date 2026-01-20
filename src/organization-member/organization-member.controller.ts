import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PatchBodyOrganizationMemberDto } from './dto/patch/patch-body-organization-member.dto';
import { PutBodyOrganizationMemberYearlyStatsDto } from './dto/put';
import { OrganizationMemberService } from './organization-member.service';
import { OrganizationMember } from '@prisma/client';

@ApiTags('Organization Members')
@Controller('organization-members')
export class OrganizationMemberController {
  constructor(
    private readonly organizationMemberService: OrganizationMemberService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization member' })
  @ApiResponse({
    status: 201,
    description: 'Organization member created successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'Organization member already exists',
  })
  async create(@Body() createOrgMemberDto: any): Promise<any> {
    return this.organizationMemberService.create(createOrgMemberDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all organization members or filter by company',
  })
  @ApiQuery({
    name: 'companyId',
    required: false,
    description: 'Filter organization members by company ID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of organization members',
  })
  async findAll(@Query('companyId') companyId?: string): Promise<any[]> {
    if (companyId) {
      return this.organizationMemberService.findByCompanyId(companyId);
    }
    return this.organizationMemberService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization member by ID' })
  @ApiParam({ name: 'id', description: 'Organization member ID' })
  @ApiResponse({
    status: 200,
    description: 'Organization member found',
  })
  @ApiResponse({ status: 404, description: 'Organization member not found' })
  async findOne(@Param('id') id: string): Promise<OrganizationMember> {
    return this.organizationMemberService.findById(id);
  }

  @Get(':id/:year')
  @ApiOperation({ summary: 'Get organization member by ID' })
  @ApiParam({ name: 'id', description: 'Organization member ID' })
  @ApiParam({ name: 'year', description: 'Year filter' })
  @ApiResponse({
    status: 200,
    description: 'Organization member found',
  })
  @ApiResponse({ status: 404, description: 'Organization member not found' })
  async findOneByYear(
    @Param('id') id: string,
    @Param('year') year: string,
  ): Promise<OrganizationMember> {
    const yearNumber = parseInt(year);
    return this.organizationMemberService.findById(id, yearNumber);
  }

  @Get(':id/yearly-stats')
  @ApiOperation({ summary: 'Get yearly stats for organization member' })
  @ApiParam({ name: 'id', description: 'Organization member ID' })
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'Filter stats by specific year',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Organization member yearly stats',
  })
  @ApiResponse({ status: 404, description: 'Organization member not found' })
  async getYearlyStats(
    @Param('id') id: string,
    @Query('year') year?: string,
  ): Promise<any> {
    return this.organizationMemberService.getYearlyStats(
      id,
      year ? parseInt(year) : undefined,
    );
  }

  @Post(':id/yearly-stats/:year')
  @ApiOperation({ summary: 'Create yearly stats for organization member' })
  @ApiParam({ name: 'id', description: 'Organization member ID' })
  @ApiParam({ name: 'year', description: 'Year for the stats' })
  @ApiResponse({
    status: 201,
    description: 'Yearly stats created successfully',
  })
  @ApiResponse({ status: 404, description: 'Organization member not found' })
  @ApiResponse({
    status: 409,
    description:
      'Yearly stats for this organization member and year already exist',
  })
  async createYearlyStats(
    @Param('id') id: string,
    @Param('year') year: string,
    @Body() createStatsDto: any,
  ): Promise<any> {
    return this.organizationMemberService.createYearlyStats(
      id,
      createStatsDto,
      year,
    );
  }

  @Put(':id/yearly-stats/:year')
  @ApiOperation({ summary: 'Update yearly stats for organization member' })
  @ApiParam({ name: 'id', description: 'Organization member ID' })
  @ApiParam({ name: 'year', description: 'Year for the stats' })
  @ApiResponse({
    status: 200,
    description: 'Yearly stats updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Organization member not found' })
  async updateYearlyStats(
    @Param('id') id: string,
    @Param('year') year: string,
    @Body() updateStatsDto: PutBodyOrganizationMemberYearlyStatsDto,
  ): Promise<any> {
    return this.organizationMemberService.updateYearlyStats(
      id,
      year,
      updateStatsDto,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update organization member by ID' })
  @ApiParam({ name: 'id', description: 'Organization member ID' })
  @ApiResponse({
    status: 200,
    description: 'Organization member updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Organization member not found' })
  @ApiResponse({
    status: 409,
    description:
      'Organization member with azureId or uniqueName already exists',
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrgMemberDto: PatchBodyOrganizationMemberDto,
  ): Promise<any> {
    return this.organizationMemberService.update(id, updateOrgMemberDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete organization member by ID' })
  @ApiParam({ name: 'id', description: 'Organization member ID' })
  @ApiResponse({
    status: 204,
    description: 'Organization member deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Organization member not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.organizationMemberService.remove(id);
  }
}
