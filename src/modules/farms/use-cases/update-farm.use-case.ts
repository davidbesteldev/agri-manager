import { Injectable, NotFoundException } from '@nestjs/common'

import { UpdateFarmDto } from '@app/modules/farms/dto'
import { FarmCheckAreaHelper } from '@app/modules/farms/helpers'
import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'

@Injectable()
export class UpdateFarmUseCase {
  constructor(
    private readonly farmRepo: FarmRepository,
    private readonly farmCheckAreaHelper: FarmCheckAreaHelper,
  ) {}

  async execute(id: string, dto: UpdateFarmDto): Promise<FarmEntity> {
    const farm = await this.farmRepo.model.findUnique({ where: { id } })
    if (!farm) throw new NotFoundException('Farm not found.')

    const combinedData = { ...farm, ...dto }
    this.farmCheckAreaHelper.execute(combinedData)

    return this.farmRepo.model.update({ where: { id }, data: dto })
  }
}
