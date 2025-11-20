import { PaginationMetaDto, QueryPaginationDto } from '@app/common/dto'

import { HarvestEntity } from '@app/modules/harvests/repositories/entities/harvest.entity'

export class ListHarvestsQueryDto extends QueryPaginationDto {}

export class ListHarvestsResponseDto {
  data: HarvestEntity[]
  meta: PaginationMetaDto
}
