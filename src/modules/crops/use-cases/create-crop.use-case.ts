import { Injectable, UnprocessableEntityException } from '@nestjs/common'

import { removeAccents } from '@app/common/utils'

import { CreateCropDto } from '@app/modules/crops/dto'
import { CropRepository } from '@app/modules/crops/repositories/crop.repository'
import { CropEntity } from '@app/modules/crops/repositories/entities/crop.entity'

@Injectable()
export class CreateCropUseCase {
  constructor(private readonly cropRepo: CropRepository) {}

  async execute(dto: CreateCropDto): Promise<CropEntity> {
    const crop = await this.cropRepo.model.findFirst({
      where: { name: { equals: removeAccents(dto.name), mode: 'insensitive' } },
    })
    if (crop) throw new UnprocessableEntityException('Crop name already exist.')

    return this.cropRepo.model.create({ data: dto })
  }
}
