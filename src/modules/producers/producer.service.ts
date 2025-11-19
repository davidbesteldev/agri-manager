import { Injectable } from '@nestjs/common'

import {
  CreateProducerDto,
  ListProducersQueryDto,
  ListProducersResponseDto,
  UpdateProducerDto,
} from '@app/modules/producers/dto'
import { ProducerEntity } from '@app/modules/producers/repositories/entities/producer.entity'
import {
  CreateProducerUseCase,
  DeleteProducerUseCase,
  GetProducerUseCase,
  ListProducersUseCase,
  UpdateProducerUseCase,
} from '@app/modules/producers/use-cases'

@Injectable()
export class ProducerService {
  constructor(
    private readonly createProducerUseCase: CreateProducerUseCase,
    private readonly listProducersUseCase: ListProducersUseCase,
    private readonly getProducerUseCase: GetProducerUseCase,
    private readonly updateProducerUseCase: UpdateProducerUseCase,
    private readonly deleteProducerUseCase: DeleteProducerUseCase,
  ) {}

  create(dto: CreateProducerDto): Promise<ProducerEntity> {
    return this.createProducerUseCase.execute(dto)
  }

  list(query?: ListProducersQueryDto): Promise<ListProducersResponseDto> {
    return this.listProducersUseCase.execute(query)
  }

  getById(id: string): Promise<ProducerEntity> {
    return this.getProducerUseCase.execute(id)
  }

  updateById(id: string, dto: UpdateProducerDto): Promise<ProducerEntity> {
    return this.updateProducerUseCase.execute(id, dto)
  }

  deleteById(id: string): Promise<void> {
    return this.deleteProducerUseCase.execute(id)
  }
}
