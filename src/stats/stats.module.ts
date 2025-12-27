import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { IStatsRepository } from './repositories/i-stats.repository';
import { PrismaStatsRepository } from './repositories/prisma-stats.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StatsController],
  providers: [
    StatsService,
    {
      provide: IStatsRepository,
      useClass: PrismaStatsRepository,
    },
  ],
  exports: [StatsService, IStatsRepository],
})
export class StatsModule {}
