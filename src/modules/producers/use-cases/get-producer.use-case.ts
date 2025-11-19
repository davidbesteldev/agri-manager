import { Injectable, NotFoundException } from '@nestjs/common'

import { ProducerEntity } from '@app/modules/producers/repositories/entities/producer.entity'
import { ProducerRepository } from '@app/modules/producers/repositories/producer.repository'

@Injectable()
export class GetProducerUseCase {
  constructor(private readonly producerRepo: ProducerRepository) {}

  async execute(id: string): Promise<ProducerEntity> {
    const producer = await this.producerRepo.model.findUnique({ where: { id } })
    if (!producer) throw new NotFoundException('Producer not found.')

    return producer
  }
}
