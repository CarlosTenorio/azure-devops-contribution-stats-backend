import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { ITeamsRepository } from './repositories/teams.repository';
import { PrismaTeamsRepository } from './repositories/prisma-teams.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TeamsController],
  providers: [
    TeamsService,
    {
      provide: ITeamsRepository,
      useClass: PrismaTeamsRepository,
    },
  ],
  exports: [TeamsService, ITeamsRepository],
})
export class TeamsModule {}
