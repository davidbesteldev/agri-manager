import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'

import { UpdateHarvestDto } from '@app/modules/harvests/dto'
import { HarvestEntity } from '@app/modules/harvests/repositories/entities/harvest.entity'
import { HarvestRepository } from '@app/modules/harvests/repositories/harvest.repository'

@Injectable()
export class UpdateHarvestUseCase {
  constructor(private readonly harvestRepo: HarvestRepository) {}

  async execute(id: string, dto: UpdateHarvestDto): Promise<HarvestEntity> {
    const Harvest = await this.harvestRepo.model.findUnique({ where: { id } })
    if (!Harvest) throw new NotFoundException('Harvest not found.')

    const harvestNameAlreadyExist = await this.harvestRepo.model.findFirst({
      where: { name: { equals: dto.name, mode: 'insensitive' } },
    })
    if (harvestNameAlreadyExist) {
      throw new UnprocessableEntityException('Harvest name already exist.')
    }

    return this.harvestRepo.model.update({ where: { id }, data: dto })
  }
}
