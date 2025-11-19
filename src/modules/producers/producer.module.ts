import { Module } from '@nestjs/common'

import { DatabaseModule } from '@app/core/database/database.module'

import { ProducerController } from '@app/modules/producers/producer.controller'
import { ProducerService } from '@app/modules/producers/producer.service'
import { ProducerRepository } from '@app/modules/producers/repositories/producer.repository'

import * as useCases from './use-cases'

const repositories = [ProducerRepository]

@Module({
  imports: [DatabaseModule],
  controllers: [ProducerController],
  providers: [...repositories, ...Object.values(useCases), ProducerService],
  exports: [...repositories],
})
export class ProducerModule {}
