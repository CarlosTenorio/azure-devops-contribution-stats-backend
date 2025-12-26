import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { ICompaniesRepository } from './repositories/companies.repository';
import { PrismaCompaniesRepository } from './repositories/prisma-companies.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    {
      provide: ICompaniesRepository,
      useClass: PrismaCompaniesRepository,
    },
  ],
  exports: [CompaniesService, ICompaniesRepository],
})
export class CompaniesModule {}
