import { Injectable } from '@nestjs/common'

import { ListHarvestsQueryDto, ListHarvestsResponseDto } from '@app/modules/harvests/dto'
import { HarvestRepository } from '@app/modules/harvests/repositories/harvest.repository'

@Injectable()
export class ListHarvestsUseCase {
  constructor(private readonly harvestRepo: HarvestRepository) {}

  execute(query?: ListHarvestsQueryDto): Promise<ListHarvestsResponseDto> {
    return this.harvestRepo.findManyPaginated(query)
  }
}
