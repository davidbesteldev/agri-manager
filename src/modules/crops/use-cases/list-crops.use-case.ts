import { Injectable } from '@nestjs/common'

import {
  ListCropsQueryDto,
  ListCropsResponseDto,
} from '@app/modules/crops/dto/list-crops.dto'
import { CropRepository } from '@app/modules/crops/repositories/crop.repository'

@Injectable()
export class ListCropsUseCase {
  constructor(private readonly cropRepo: CropRepository) {}

  execute(query?: ListCropsQueryDto): Promise<ListCropsResponseDto> {
    return this.cropRepo.findManyPaginated(query)
  }
}
