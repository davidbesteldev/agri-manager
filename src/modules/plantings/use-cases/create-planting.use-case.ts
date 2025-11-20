import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'

import { CropRepository } from '@app/modules/crops/repositories/crop.repository'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'
import { HarvestRepository } from '@app/modules/harvests/repositories/harvest.repository'
import { CreatePlantingDto } from '@app/modules/plantings/dto'
import { FarmCropEntity } from '@app/modules/plantings/repositories/entities/farm-crop.entity'
import { FarmCropRepository } from '@app/modules/plantings/repositories/farm-crop.repository'

@Injectable()
export class CreatePlantingUseCase {
  constructor(
    private readonly farmCropRepository: FarmCropRepository,
    private readonly farmRepository: FarmRepository,
    private readonly cropRepository: CropRepository,
    private readonly harvestRepository: HarvestRepository,
  ) {}

  async execute(dto: CreatePlantingDto): Promise<FarmCropEntity> {
    const planting = await this.farmCropRepository.model.findFirst({
      where: { cropId: dto.cropId, farmId: dto.farmId, harvestId: dto.harvestId },
    })
    if (planting) throw new UnprocessableEntityException('Planting already exist.')

    await this.checkRequiredEntities(dto)

    return this.farmCropRepository.model.create({ data: dto })
  }

  private async checkRequiredEntities(dto: CreatePlantingDto): Promise<void> {
    const [farm, crop, harvest] = await Promise.all([
      this.farmRepository.model.findUnique({ where: { id: dto.farmId } }),
      this.cropRepository.model.findUnique({ where: { id: dto.cropId } }),
      this.harvestRepository.model.findUnique({ where: { id: dto.harvestId } }),
    ])

    if (!farm) throw new NotFoundException('Farm ID not found.')
    if (!crop) throw new NotFoundException('Crop ID not found.')
    if (!harvest) throw new NotFoundException('Harvest ID not found.')
  }
}
