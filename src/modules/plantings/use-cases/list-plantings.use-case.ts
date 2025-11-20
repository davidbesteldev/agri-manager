import { Injectable } from '@nestjs/common'

import { FarmCropWhereInput } from '@generated/prisma/models'

import {
  ListPlantingsQueryDto,
  ListPlantingsResponseDto,
} from '@app/modules/plantings/dto'
import { FarmCropRepository } from '@app/modules/plantings/repositories/farm-crop.repository'

@Injectable()
export class ListPlantingsUseCase {
  constructor(private readonly farmCropRepository: FarmCropRepository) {}

  async execute(query: ListPlantingsQueryDto = {}): Promise<ListPlantingsResponseDto> {
    const result = await this.farmCropRepository.findManyPaginated(query, {
      where: this.buildWhere(query),
      omit: { cropId: true, farmId: true, harvestId: true },
      include: { farm: true, crop: true, harvest: true },
    })

    return result as unknown as ListPlantingsResponseDto
  }

  private buildWhere(query: ListPlantingsQueryDto): FarmCropWhereInput {
    const directFilters = {
      ...(query?.farmId && { farmId: query.farmId }),
      ...(query?.cropId && { cropId: query.cropId }),
      ...(query?.harvestId && { harvestId: query.harvestId }),
    }

    const producerFilter = query?.producerId
      ? { farm: { producerId: query.producerId } }
      : {}

    return {
      ...directFilters,
      ...producerFilter,
    }
  }
}
