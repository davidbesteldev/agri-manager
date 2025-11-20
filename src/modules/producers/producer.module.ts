import { Module } from '@nestjs/common'

import { DatabaseModule } from '@app/core/database/database.module'

import { ProducerController } from '@app/modules/producers/producer.controller'
import { ProducerService } from '@app/modules/producers/producer.service'
import { ProducerRepository } from '@app/modules/producers/repositories/producer.repository'

import * as useCases from './use-cases'

@Module({
  imports: [DatabaseModule],
  controllers: [ProducerController],
  providers: [ProducerRepository, ...Object.values(useCases), ProducerService],
  exports: [ProducerRepository],
})
export class ProducerModule {}
