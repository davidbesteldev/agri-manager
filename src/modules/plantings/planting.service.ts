import { Injectable } from '@nestjs/common'

import {
  CreatePlantingDto,
  ListPlantingsQueryDto,
  ListPlantingsResponseDto,
} from '@app/modules/plantings/dto'
import { FarmCropEntity } from '@app/modules/plantings/repositories/entities/farm-crop.entity'
import {
  CreatePlantingUseCase,
  ListPlantingsUseCase,
} from '@app/modules/plantings/use-cases'

@Injectable()
export class PlantingService {
  constructor(
    private readonly createPlantingUseCase: CreatePlantingUseCase,
    private readonly listPlantingsUseCase: ListPlantingsUseCase,
  ) {}

  create(dto: CreatePlantingDto): Promise<FarmCropEntity> {
    return this.createPlantingUseCase.execute(dto)
  }

  list(query?: ListPlantingsQueryDto): Promise<ListPlantingsResponseDto> {
    return this.listPlantingsUseCase.execute(query)
  }
}
