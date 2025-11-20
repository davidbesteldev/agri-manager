import { Injectable } from '@nestjs/common'

import {
  CreateHarvestDto,
  ListHarvestsQueryDto,
  ListHarvestsResponseDto,
  UpdateHarvestDto,
} from '@app/modules/harvests/dto'
import { HarvestEntity } from '@app/modules/harvests/repositories/entities/harvest.entity'
import {
  CreateHarvestUseCase,
  ListHarvestsUseCase,
  UpdateHarvestUseCase,
} from '@app/modules/harvests/use-cases'

@Injectable()
export class HarvestService {
  constructor(
    private readonly createHarvestUseCase: CreateHarvestUseCase,
    private readonly listHarvestsUseCase: ListHarvestsUseCase,
    private readonly updateHarvestUseCase: UpdateHarvestUseCase,
  ) {}

  create(dto: CreateHarvestDto): Promise<HarvestEntity> {
    return this.createHarvestUseCase.execute(dto)
  }

  list(query?: ListHarvestsQueryDto): Promise<ListHarvestsResponseDto> {
    return this.listHarvestsUseCase.execute(query)
  }

  updateById(id: string, dto: UpdateHarvestDto): Promise<HarvestEntity> {
    return this.updateHarvestUseCase.execute(id, dto)
  }
}
