import { Injectable, NotFoundException } from '@nestjs/common'

import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'

@Injectable()
export class GetFarmUseCase {
  constructor(private readonly farmRepo: FarmRepository) {}

  async execute(id: string): Promise<FarmEntity> {
    const farm = await this.farmRepo.model.findUnique({ where: { id } })
    if (!farm) throw new NotFoundException('Farm not found.')

    return farm
  }
}
