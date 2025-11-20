import { PaginationMetaDto, QueryPaginationDto } from '@app/common/dto'

import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'

export class ListFarmsQueryDto extends QueryPaginationDto {}

export class ListFarmsResponseDto {
  data: FarmEntity[]
  meta: PaginationMetaDto
}
