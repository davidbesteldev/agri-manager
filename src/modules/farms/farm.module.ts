import { Module } from '@nestjs/common'

import { DatabaseModule } from '@app/core/database/database.module'

import { FarmController } from '@app/modules/farms/farm.controller'
import { FarmService } from '@app/modules/farms/farm.service'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'
import { ProducerModule } from '@app/modules/producers/producer.module'

import * as helpers from './helpers'
import * as useCases from './use-cases'

@Module({
  imports: [DatabaseModule, ProducerModule],
  controllers: [FarmController],
  providers: [
    FarmRepository,
    ...Object.values(helpers),
    ...Object.values(useCases),
    FarmService,
  ],
  exports: [FarmRepository],
})
export class FarmModule {}
