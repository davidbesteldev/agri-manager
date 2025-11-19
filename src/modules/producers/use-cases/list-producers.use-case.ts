import { Injectable } from '@nestjs/common'

import {
  ListProducersQueryDto,
  ListProducersResponseDto,
} from '@app/modules/producers/dto'
import { ProducerRepository } from '@app/modules/producers/repositories/producer.repository'

@Injectable()
export class ListProducersUseCase {
  constructor(private readonly producerRepo: ProducerRepository) {}

  execute(query?: ListProducersQueryDto): Promise<ListProducersResponseDto> {
    return this.producerRepo.findManyPaginated(query)
  }
}
