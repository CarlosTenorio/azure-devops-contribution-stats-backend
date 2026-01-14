import { Module } from '@nestjs/common';
import { OrganizationMemberController } from './organization-member.controller';
import { OrganizationMemberService } from './organization-member.service';
import { IOrganizationMemberRepository } from './repositories/organization-member.repository';
import { PrismaOrganizationMemberRepository } from './repositories/prisma-organization-member.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { StatsModule } from '../stats/stats.module';

@Module({
  imports: [PrismaModule, StatsModule],
  controllers: [OrganizationMemberController],
  providers: [
    OrganizationMemberService,
    {
      provide: IOrganizationMemberRepository,
      useClass: PrismaOrganizationMemberRepository,
    },
  ],
  exports: [OrganizationMemberService, IOrganizationMemberRepository],
})
export class OrganizationMemberModule {}
