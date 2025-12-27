import { Prisma, YearlyStats } from 'src/prisma/generated/client';

export abstract class IStatsRepository {
  abstract findAll(): Promise<YearlyStats[]>;
  abstract findById(id: string): Promise<YearlyStats | null>;
  abstract findByUserId(userId: string): Promise<YearlyStats[]>;
  abstract findByYear(year: number): Promise<YearlyStats[]>;
  abstract findByUserIdAndYear(
    userId: string,
    year: number,
  ): Promise<YearlyStats | null>;
  abstract create(data: Prisma.YearlyStatsCreateInput): Promise<YearlyStats>;
  abstract update(
    id: string,
    data: Prisma.YearlyStatsUpdateInput,
  ): Promise<YearlyStats>;
  abstract delete(id: string): Promise<YearlyStats>;
}
