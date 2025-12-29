import { Injectable } from '@nestjs/common';
import { Prisma, YearlyStats } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { IStatsRepository } from './i-stats.repository';

@Injectable()
export class PrismaStatsRepository extends IStatsRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll(): Promise<YearlyStats[]> {
    return this.prisma.yearlyStats.findMany({
      include: { user: true, pullRequests: true },
      orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findById(id: string): Promise<YearlyStats | null> {
    return this.prisma.yearlyStats.findUnique({
      where: { id },
      include: { user: true, pullRequests: true },
    });
  }

  async findByUserId(userId: string): Promise<YearlyStats[]> {
    return this.prisma.yearlyStats.findMany({
      where: { userId },
      include: { user: true, pullRequests: true },
      orderBy: { year: 'desc' },
    });
  }

  async findByYear(year: number): Promise<YearlyStats[]> {
    return this.prisma.yearlyStats.findMany({
      where: { year },
      include: { user: true, pullRequests: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByUserIdAndYear(
    userId: string,
    year: number,
  ): Promise<YearlyStats | null> {
    return this.prisma.yearlyStats.findUnique({
      where: {
        userId_year: {
          userId,
          year,
        },
      },
      include: { user: true, pullRequests: true },
    });
  }

  async create(data: Prisma.YearlyStatsCreateInput): Promise<YearlyStats> {
    return this.prisma.yearlyStats.create({
      data,
      include: { user: true, pullRequests: true },
    });
  }

  async update(
    id: string,
    data: Prisma.YearlyStatsUpdateInput,
  ): Promise<YearlyStats> {
    return this.prisma.yearlyStats.update({
      where: { id },
      data,
      include: { user: true, pullRequests: true },
    });
  }

  async delete(id: string): Promise<YearlyStats> {
    return this.prisma.yearlyStats.delete({ where: { id } });
  }
}
