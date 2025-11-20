import { Injectable } from '@nestjs/common'

import { CreateCropDto } from '@app/modules/crops/dto'
import {
  ListCropsQueryDto,
  ListCropsResponseDto,
} from '@app/modules/crops/dto/list-crops.dto'
import { UpdateCropDto } from '@app/modules/crops/dto/update-crop.dto'
import { CropEntity } from '@app/modules/crops/repositories/entities/crop.entity'
import { CreateCropUseCase, ListCropsUseCase } from '@app/modules/crops/use-cases'
import { UpdateCropUseCase } from '@app/modules/crops/use-cases/update-crop.use-case'

@Injectable()
export class CropService {
  constructor(
    private readonly createCropUseCase: CreateCropUseCase,
    private readonly listCropsUseCase: ListCropsUseCase,
    private readonly updateCropUseCase: UpdateCropUseCase,
  ) {}

  create(dto: CreateCropDto): Promise<CropEntity> {
    return this.createCropUseCase.execute(dto)
  }

  list(query?: ListCropsQueryDto): Promise<ListCropsResponseDto> {
    return this.listCropsUseCase.execute(query)
  }

  updateById(id: string, dto: UpdateCropDto): Promise<CropEntity> {
    return this.updateCropUseCase.execute(id, dto)
  }
}
