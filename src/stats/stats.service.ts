import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { YearlyStats } from '@prisma/client';
import { IStatsRepository } from './repositories/i-stats.repository';

@Injectable()
export class StatsService {
  constructor(private readonly statsRepository: IStatsRepository) {}

  private transformStatsToDto(stats: YearlyStats): any {
    return {
      ...stats,
      reposMostActive: Array.isArray(stats.reposMostActive)
        ? (stats.reposMostActive as string[])
        : [],
    };
  }

  private transformStatsArrayToDto(statsArray: YearlyStats[]): any[] {
    return statsArray.map((stats) => this.transformStatsToDto(stats));
  }

  async findAll(): Promise<any[]> {
    const stats = await this.statsRepository.findAll();
    return this.transformStatsArrayToDto(stats);
  }

  async findById(id: string): Promise<any> {
    const stats = await this.statsRepository.findById(id);
    if (!stats) {
      throw new NotFoundException(`Stats with ID ${id} not found`);
    }
    return this.transformStatsToDto(stats);
  }

  async findByUserId(userId: string): Promise<any[]> {
    const stats = await this.statsRepository.findByUserId(userId);
    return this.transformStatsArrayToDto(stats);
  }

  async findByYear(year: number): Promise<any[]> {
    const stats = await this.statsRepository.findByYear(year);
    return this.transformStatsArrayToDto(stats);
  }

  async findByUserIdAndYear(userId: string, year: number): Promise<any | null> {
    const stats = await this.statsRepository.findByUserIdAndYear(userId, year);
    return stats ? this.transformStatsToDto(stats) : null;
  }

  async create(createStatsDto: any): Promise<any> {
    const existingStats = await this.statsRepository.findByUserIdAndYear(
      createStatsDto.userId,
      createStatsDto.year,
    );

    if (existingStats) {
      throw new ConflictException(
        `Stats for user ${createStatsDto.userId} and year ${createStatsDto.year} already exist`,
      );
    }

    const createdStats = await this.statsRepository.create({
      year: createStatsDto.year,
      commentsRatePerPRPercent: createStatsDto.commentsRatePerPRPercent ?? 0,
      prCommentsMade: createStatsDto.prCommentsMade ?? 0,
      prsClosed: createStatsDto.prsClosed ?? 0,
      prsReviewed: createStatsDto.prsReviewed ?? 0,
      workItemsAssigned: createStatsDto.workItemsAssigned ?? 0,
      workItemsCreated: createStatsDto.workItemsCreated ?? 0,
      reposMostActive: createStatsDto.reposMostActive ?? [],
      user: {
        connect: { id: createStatsDto.userId },
      },
    });

    return this.transformStatsToDto(createdStats);
  }

  async update(id: string, updateStatsDto: any): Promise<any> {
    const stats = await this.statsRepository.findById(id);
    if (!stats) {
      throw new NotFoundException(`Stats with ID ${id} not found`);
    }

    if (updateStatsDto.userId && updateStatsDto.year) {
      const existingStats = await this.statsRepository.findByUserIdAndYear(
        updateStatsDto.userId,
        updateStatsDto.year,
      );

      if (existingStats && existingStats.id !== id) {
        throw new ConflictException(
          `Stats for user ${updateStatsDto.userId} and year ${updateStatsDto.year} already exist`,
        );
      }
    }

    const updateData: any = {};
    if (updateStatsDto.year !== undefined)
      updateData.year = updateStatsDto.year;
    if (updateStatsDto.commentsRatePerPRPercent !== undefined)
      updateData.commentsRatePerPRPercent =
        updateStatsDto.commentsRatePerPRPercent;
    if (updateStatsDto.prCommentsMade !== undefined)
      updateData.prCommentsMade = updateStatsDto.prCommentsMade;
    if (updateStatsDto.prsClosed !== undefined)
      updateData.prsClosed = updateStatsDto.prsClosed;
    if (updateStatsDto.prsReviewed !== undefined)
      updateData.prsReviewed = updateStatsDto.prsReviewed;
    if (updateStatsDto.workItemsAssigned !== undefined)
      updateData.workItemsAssigned = updateStatsDto.workItemsAssigned;
    if (updateStatsDto.workItemsCreated !== undefined)
      updateData.workItemsCreated = updateStatsDto.workItemsCreated;
    if (updateStatsDto.reposMostActive !== undefined)
      updateData.reposMostActive = updateStatsDto.reposMostActive;
    if (updateStatsDto.userId) {
      updateData.user = { connect: { id: updateStatsDto.userId } };
    }

    const updatedStats = await this.statsRepository.update(id, updateData);
    return this.transformStatsToDto(updatedStats);
  }

  async remove(id: string): Promise<any> {
    const stats = await this.statsRepository.findById(id);
    if (!stats) {
      throw new NotFoundException(`Stats with ID ${id} not found`);
    }

    const deletedStats = await this.statsRepository.delete(id);
    return this.transformStatsToDto(deletedStats);
  }
}
