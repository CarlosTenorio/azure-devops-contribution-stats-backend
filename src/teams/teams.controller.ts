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
import { PatchBodyTeamsDto } from './dto/patch';
import { TeamsService } from './teams.service';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new team' })
  @ApiResponse({
    status: 201,
    description: 'Team created successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'Team name already exists in company',
  })
  async create(@Body() createTeamDto: any): Promise<any> {
    return this.teamsService.create(createTeamDto);
  }

  @Post(':id/users')
  @ApiOperation({ summary: 'Add user to a team' })
  @ApiParam({ name: 'id', description: 'Team ID' })
  @ApiResponse({
    status: 200,
    description: 'User added to team successfully',
  })
  @ApiResponse({ status: 404, description: 'Team not found' })
  async addUserToTeam(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ): Promise<any> {
    return this.teamsService.addUserToTeam(id, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all teams or teams by company' })
  @ApiQuery({
    name: 'companyId',
    required: false,
    description: 'Filter teams by company ID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of teams',
  })
  async findAll(@Query('companyId') companyId?: string): Promise<any[]> {
    if (companyId) {
      return this.teamsService.findByCompanyId(companyId);
    }
    return this.teamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get team by ID' })
  @ApiParam({ name: 'id', description: 'Team ID' })
  @ApiResponse({
    status: 200,
    description: 'Team found',
  })
  @ApiResponse({ status: 404, description: 'Team not found' })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.teamsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update team by ID' })
  @ApiParam({ name: 'id', description: 'Team ID' })
  @ApiResponse({
    status: 200,
    description: 'Team updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Team not found' })
  @ApiResponse({
    status: 409,
    description: 'Team name already exists in company',
  })
  async update(
    @Param('id') id: string,
    @Body() updateTeamDto: PatchBodyTeamsDto,
  ): Promise<any> {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete team by ID' })
  @ApiParam({ name: 'id', description: 'Team ID' })
  @ApiResponse({ status: 204, description: 'Team deleted successfully' })
  @ApiResponse({ status: 404, description: 'Team not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.teamsService.remove(id);
  }

  @Delete(':id/users/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove user from a team' })
  @ApiParam({ name: 'id', description: 'Team ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 204,
    description: 'User removed from team successfully',
  })
  @ApiResponse({ status: 404, description: 'Team or User not found' })
  async removeUserFromTeam(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    await this.teamsService.removeUserFromTeam(id, userId);
  }
}
