import { Module } from '@nestjs/common'

import { DatabaseModule } from '@app/core/database/database.module'

import { HarvestController } from '@app/modules/harvests/harvest.controller'
import { HarvestService } from '@app/modules/harvests/harvest.service'
import { HarvestRepository } from '@app/modules/harvests/repositories/harvest.repository'

import * as useCases from './use-cases'

@Module({
  imports: [DatabaseModule],
  controllers: [HarvestController],
  providers: [HarvestRepository, ...Object.values(useCases), HarvestService],
  exports: [HarvestRepository],
})
export class HarvestModule {}
