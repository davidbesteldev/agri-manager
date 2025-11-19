import { Injectable, NotFoundException } from '@nestjs/common'

import { UpdateProducerDto } from '@app/modules/producers/dto'
import { ProducerEntity } from '@app/modules/producers/repositories/entities/producer.entity'
import { ProducerRepository } from '@app/modules/producers/repositories/producer.repository'

@Injectable()
export class UpdateProducerUseCase {
  constructor(private readonly producerRepo: ProducerRepository) {}

  async execute(id: string, dto: UpdateProducerDto): Promise<ProducerEntity> {
    const producer = await this.producerRepo.model.findUnique({ where: { id } })
    if (!producer) throw new NotFoundException('Producer not found.')

    return this.producerRepo.model.update({ where: { id }, data: dto })
  }
}
