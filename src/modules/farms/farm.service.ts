import { Injectable } from '@nestjs/common'

import {
  CreateFarmDto,
  ListFarmsQueryDto,
  ListFarmsResponseDto,
  UpdateFarmDto,
} from '@app/modules/farms/dto'
import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'
import {
  CreateFarmUseCase,
  DeleteFarmUseCase,
  GetFarmUseCase,
  ListFarmsUseCase,
  UpdateFarmUseCase,
} from '@app/modules/farms/use-cases'

@Injectable()
export class FarmService {
  constructor(
    private readonly createFarmUseCase: CreateFarmUseCase,
    private readonly listFarmsUseCase: ListFarmsUseCase,
    private readonly getFarmUseCase: GetFarmUseCase,
    private readonly updateFarmUseCase: UpdateFarmUseCase,
    private readonly deleteFarmUseCase: DeleteFarmUseCase,
  ) {}

  create(dto: CreateFarmDto): Promise<FarmEntity> {
    return this.createFarmUseCase.execute(dto)
  }

  list(query?: ListFarmsQueryDto): Promise<ListFarmsResponseDto> {
    return this.listFarmsUseCase.execute(query)
  }

  getById(id: string): Promise<FarmEntity> {
    return this.getFarmUseCase.execute(id)
  }

  updateById(id: string, dto: UpdateFarmDto): Promise<FarmEntity> {
    return this.updateFarmUseCase.execute(id, dto)
  }

  deleteById(id: string): Promise<void> {
    return this.deleteFarmUseCase.execute(id)
  }
}
