import { Injectable, UnprocessableEntityException } from '@nestjs/common'

import { CreateProducerDto } from '@app/modules/producers/dto'
import { ProducerEntity } from '@app/modules/producers/repositories/entities/producer.entity'
import { ProducerRepository } from '@app/modules/producers/repositories/producer.repository'

@Injectable()
export class CreateProducerUseCase {
  constructor(private readonly producerRepo: ProducerRepository) {}

  async execute(dto: CreateProducerDto): Promise<ProducerEntity> {
    const producer = await this.producerRepo.model.findFirst({
      where: { document: dto.document },
    })
    if (producer) throw new UnprocessableEntityException('Producer already exists.')

    return this.producerRepo.model.create({ data: dto })
  }
}
