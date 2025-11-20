import { Injectable } from '@nestjs/common'

import { UpdateFarmDto } from '@app/modules/farms/dto'
import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'

@Injectable()
export class UpdateFarmUseCase {
  constructor(private readonly farmRepo: FarmRepository) {}

  async execute(id: string, dto: UpdateFarmDto): Promise<FarmEntity> {
    return this.farmRepo.model.update({ where: { id }, data: dto })
  }
}
