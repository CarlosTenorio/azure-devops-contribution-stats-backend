import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { TeamsModule } from './teams/teams.module';
import { StatsModule } from './stats/stats.module';
import { OrganizationMemberModule } from './organization-member/organization-member.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    CompaniesModule,
    TeamsModule,
    StatsModule,
    OrganizationMemberModule,
  ],
  providers: [AppService],
})
export class AppModule {}
