import { PaginationMetaDto, QueryPaginationDto } from '@app/common/dto'

import { ProducerEntity } from '@app/modules/producers/repositories/entities/producer.entity'

export class ListProducersQueryDto extends QueryPaginationDto {}

export class ListProducersResponseDto {
  data: ProducerEntity[]
  meta: PaginationMetaDto
}
