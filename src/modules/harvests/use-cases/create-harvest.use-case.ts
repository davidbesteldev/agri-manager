import { Injectable, UnprocessableEntityException } from '@nestjs/common'

import { CreateHarvestDto } from '@app/modules/harvests/dto'
import { HarvestEntity } from '@app/modules/harvests/repositories/entities/harvest.entity'
import { HarvestRepository } from '@app/modules/harvests/repositories/harvest.repository'

@Injectable()
export class CreateHarvestUseCase {
  constructor(private readonly harvestRepo: HarvestRepository) {}

  async execute(dto: CreateHarvestDto): Promise<HarvestEntity> {
    const harvest = await this.harvestRepo.model.findFirst({
      where: { name: { equals: dto.name, mode: 'insensitive' } },
    })
    if (harvest) throw new UnprocessableEntityException('Harvest name already exist.')

    return this.harvestRepo.model.create({ data: dto })
  }
}
