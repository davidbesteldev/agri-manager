import { Injectable, NotFoundException } from '@nestjs/common'

import { ProducerRepository } from '@app/modules/producers/repositories/producer.repository'

@Injectable()
export class DeleteProducerUseCase {
  constructor(private readonly producerRepo: ProducerRepository) {}

  async execute(id: string): Promise<void> {
    const producer = await this.producerRepo.model.findUnique({ where: { id } })
    if (!producer) throw new NotFoundException('Producer not found.')

    await this.producerRepo.model.delete({ where: { id } })
  }
}
