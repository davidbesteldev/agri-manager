import { PaginationMetaDto, QueryPaginationDto } from '@app/common/dto'

import { CropEntity } from '@app/modules/crops/repositories/entities/crop.entity'

export class ListCropsQueryDto extends QueryPaginationDto {}

export class ListCropsResponseDto {
  data: CropEntity[]
  meta: PaginationMetaDto
}
