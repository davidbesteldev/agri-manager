import { Injectable, UnprocessableEntityException } from '@nestjs/common'

import { CreateFarmDto } from '@app/modules/farms/dto'
import { FarmCheckAreaHelper } from '@app/modules/farms/helpers'
import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'
import { ProducerRepository } from '@app/modules/producers/repositories/producer.repository'

@Injectable()
export class CreateFarmUseCase {
  constructor(
    private readonly producerRepo: ProducerRepository,
    private readonly farmRepo: FarmRepository,
    private readonly farmCheckAreaHelper: FarmCheckAreaHelper,
  ) {}

  async execute(dto: CreateFarmDto): Promise<FarmEntity> {
    const producer = await this.producerRepo.model.findFirst({
      where: { id: dto.producerId },
    })
    if (!producer) throw new UnprocessableEntityException('Producer not found.')

    this.farmCheckAreaHelper.execute(dto)

    return this.farmRepo.model.create({ data: dto })
  }
}
