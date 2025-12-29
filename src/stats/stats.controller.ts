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
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StatsService } from './stats.service';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new yearly stats' })
  @ApiResponse({
    status: 201,
    description: 'Stats created successfully',
    // type: DetailedStatsResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Stats for user and year already exist',
  })
  async create(@Body() createStatsDto: any): Promise<any> {
    return this.statsService.create(createStatsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stats or filter by user/year' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter stats by user ID',
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'Filter stats by year',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'List of stats',
    // type: [DetailedStatsResponseDto],
  })
  async findAll(
    @Query('userId') userId?: string,
    @Query('year') year?: string,
  ): Promise<any[]> {
    if (userId && year) {
      const stats = await this.statsService.findByUserIdAndYear(
        userId,
        parseInt(year),
      );
      return stats ? [stats] : [];
    }

    if (userId) {
      return this.statsService.findByUserId(userId);
    }

    if (year) {
      return this.statsService.findByYear(parseInt(year));
    }

    return this.statsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get stats by ID' })
  @ApiParam({ name: 'id', description: 'Stats ID' })
  @ApiResponse({
    status: 200,
    description: 'Stats found',
    // type: DetailedStatsResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Stats not found' })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.statsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update stats by ID' })
  @ApiParam({ name: 'id', description: 'Stats ID' })
  @ApiResponse({
    status: 200,
    description: 'Stats updated successfully',
    // type: DetailedStatsResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Stats not found' })
  @ApiResponse({
    status: 409,
    description: 'Stats for user and year already exist',
  })
  async update(
    @Param('id') id: string,
    @Body() updateStatsDto: any,
  ): Promise<any> {
    return this.statsService.update(id, updateStatsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete stats by ID' })
  @ApiParam({ name: 'id', description: 'Stats ID' })
  @ApiResponse({ status: 204, description: 'Stats deleted successfully' })
  @ApiResponse({ status: 404, description: 'Stats not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.statsService.remove(id);
  }
}
