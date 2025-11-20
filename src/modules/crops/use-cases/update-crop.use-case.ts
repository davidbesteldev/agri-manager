import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'

import { removeAccents } from '@app/common/utils'

import { UpdateCropDto } from '@app/modules/crops/dto/update-crop.dto'
import { CropRepository } from '@app/modules/crops/repositories/crop.repository'
import { CropEntity } from '@app/modules/crops/repositories/entities/crop.entity'

@Injectable()
export class UpdateCropUseCase {
  constructor(private readonly cropRepo: CropRepository) {}

  async execute(id: string, dto: UpdateCropDto): Promise<CropEntity> {
    const crop = await this.cropRepo.model.findUnique({ where: { id } })
    if (!crop) throw new NotFoundException('Crop not found.')

    const cropNameAlreadyExist = await this.cropRepo.model.findFirst({
      where: { name: { equals: removeAccents(dto.name), mode: 'insensitive' } },
    })
    if (cropNameAlreadyExist) {
      throw new UnprocessableEntityException('Crop name already exist.')
    }

    return this.cropRepo.model.update({ where: { id }, data: dto })
  }
}
