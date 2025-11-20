import { Injectable, NotFoundException } from '@nestjs/common'

import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'

@Injectable()
export class DeleteFarmUseCase {
  constructor(private readonly farmRepo: FarmRepository) {}

  async execute(id: string): Promise<void> {
    const farm = await this.farmRepo.model.findUnique({ where: { id } })
    if (!farm) throw new NotFoundException('Farm not found.')

    await this.farmRepo.model.delete({ where: { id } })
  }
}
